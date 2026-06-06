import type { Chapter } from "../types";

export const ch07: Chapter = {
  id: "java-exceptions",
  title: "Exceptions",
  glyph: "🛟",
  summary:
    "Sooner or later your program meets a value it can't handle and panics. Exceptions are Java's way of throwing a flare instead of crashing in a heap. Catch them, clean up after them, and even throw your own when something smells wrong.",
  lessons: [
    {
      id: "java-try-catch",
      track: "java",
      title: "Catching a falling program",
      subtitle: "Wrap risky code in try/catch so a crash becomes a calm message.",
      concepts: ["try", "catch"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "Some code is just asking for trouble" },
        {
          type: "p",
          text: "Integer.parseInt(\"42\") happily gives you 42. Integer.parseInt(\"banana\") does not, because bananas are not numbers. Left alone, that line blows up and takes your whole program down with it.",
        },
        {
          type: "p",
          text: "A try block says \"attempt this, but stay calm if it goes wrong.\" If something throws, Java jumps straight to the catch block instead of crashing. Your program lives to print another day.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"banana\");\n            System.out.println(n);\n        } catch (Exception e) {\n            System.out.println(\"That was not a number\");\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "The println inside try never runs here — the moment parseInt throws, Java teleports to catch and the lines after it are skipped.",
        },
        {
          type: "p",
          text: "Wrap Integer.parseInt(\"oops\") in a try block. In the catch block, print Caught it! so a guaranteed-bad parse turns into a friendly line instead of a meltdown.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: try to parse \"oops\" as an int\n        // TODO: catch the failure and print: Caught it!\n        int n = Integer.parseInt(\"oops\");\n        System.out.println(n);\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"oops\");\n            System.out.println(n);\n        } catch (Exception e) {\n            System.out.println(\"Caught it!\");\n        }\n    }\n}\n",
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Catch the failure", kind: "codeContains", value: "catch" },
        { label: "Print the friendly line", kind: "stdoutContains", value: "Caught it!" },
      ],
      hints: [
        "Put the risky parseInt line inside try { ... }.",
        "Right after the try block, add catch (Exception e) { ... }.",
        "Full shape: try { int n = Integer.parseInt(\"oops\"); System.out.println(n); } catch (Exception e) { System.out.println(\"Caught it!\"); }",
      ],
      wellDone: "Your program stared into the abyss, the abyss threw an exception, and you caught it. Nicely done.",
    },
    {
      id: "java-specific-exception",
      track: "java",
      title: "Catch the exact thing that went wrong",
      subtitle: "Name a specific exception type and respond with a tailored message.",
      concepts: ["catch", "exception types"],
      estimatedMinutes: 6,
      intro: [
        { type: "h", text: "Different problems, different replies" },
        {
          type: "p",
          text: "catch (Exception e) catches everything, like a net with no holes. But often you want to react to one specific kind of failure. Reaching past the end of an array throws an ArrayIndexOutOfBoundsException — a mouthful, but a very precise one.",
        },
        {
          type: "p",
          text: "Catch that exact type and you can print a message that actually fits the crime. The variable e holds the exception object, and e.getMessage() can tell you more if you ask.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        try {\n            System.out.println(nums[10]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"No item at that index\");\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "An array of length 3 has spots 0, 1, and 2. Ask for spot 10 and Java throws — there's simply nothing there to hand you.",
        },
        {
          type: "p",
          text: "Make an int array {7, 8, 9}, then in a try block read index 99. Catch ArrayIndexOutOfBoundsException and print Index out of range so the reader knows exactly what happened.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        int[] nums = {7, 8, 9};\n        // TODO: try reading nums[99]\n        // TODO: catch ArrayIndexOutOfBoundsException and print: Index out of range\n        System.out.println(nums[99]);\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        int[] nums = {7, 8, 9};\n        try {\n            System.out.println(nums[99]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println(\"Index out of range\");\n        }\n    }\n}\n",
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Catch the specific type", kind: "codeContains", value: "ArrayIndexOutOfBoundsException" },
        { label: "Print the tailored message", kind: "stdoutContains", value: "Index out of range" },
      ],
      hints: [
        "Put System.out.println(nums[99]); inside a try block.",
        "Name the exact type in catch: catch (ArrayIndexOutOfBoundsException e) { ... }.",
        "Inside that catch: System.out.println(\"Index out of range\");",
      ],
      wellDone: "You didn't just catch the error — you caught the right one and gave it a useful reply.",
    },
    {
      id: "java-finally",
      track: "java",
      title: "The block that always runs",
      subtitle: "Use finally for cleanup that has to happen no matter what.",
      concepts: ["finally", "cleanup"],
      estimatedMinutes: 5,
      intro: [
        { type: "h", text: "finally: it shows up either way" },
        {
          type: "p",
          text: "Sometimes you have work that must happen whether things went smoothly or burst into flames — closing a file, releasing a lock, tidying up. That's what a finally block is for. It runs after try, and after catch too, every single time.",
        },
        {
          type: "p",
          text: "Success or failure, finally has your back. It's the one guest who always helps clean up after the party.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"nope\");\n            System.out.println(n);\n        } catch (Exception e) {\n            System.out.println(\"Parsing failed\");\n        } finally {\n            System.out.println(\"All cleaned up\");\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Even if the catch block prints first, finally prints right after. Run the example and you'll see both lines, in that order.",
        },
        {
          type: "p",
          text: "Wrap Integer.parseInt(\"nope\") in a try. Catch the failure and print Parsing failed, then add a finally block that prints All done. Both messages should appear.",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        // TODO: try parsing \"nope\", catch and print: Parsing failed\n        // TODO: add a finally block that prints: All done\n        int n = Integer.parseInt(\"nope\");\n        System.out.println(n);\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"nope\");\n            System.out.println(n);\n        } catch (Exception e) {\n            System.out.println(\"Parsing failed\");\n        } finally {\n            System.out.println(\"All done\");\n        }\n    }\n}\n",
      checks: [
        { label: "Open a try block", kind: "codeContains", value: "try" },
        { label: "Catch the failure", kind: "codeContains", value: "catch" },
        { label: "Add a finally block", kind: "codeContains", value: "finally" },
        { label: "Show the catch message", kind: "stdoutContains", value: "Parsing failed" },
        { label: "Show the cleanup message", kind: "stdoutContains", value: "All done" },
      ],
      hints: [
        "Keep your try/catch from before, catching and printing Parsing failed.",
        "After the catch block, add finally { ... }.",
        "Inside finally: System.out.println(\"All done\"); — and it runs no matter what.",
      ],
      wellDone: "try, catch, and finally working together — your cleanup code now runs rain or shine.",
    },
    {
      id: "java-throw-own",
      track: "java",
      title: "Throw your own complaint",
      subtitle: "Raise an IllegalArgumentException on bad input, then catch it.",
      concepts: ["throw", "IllegalArgumentException"],
      estimatedMinutes: 7,
      intro: [
        { type: "h", text: "Be the one who throws this time" },
        {
          type: "p",
          text: "You've been catching exceptions other code threw. Now flip it: when your program gets input it refuses to accept, you can throw your own. IllegalArgumentException is the standard way to say \"that argument makes no sense.\"",
        },
        {
          type: "p",
          text: "throw new IllegalArgumentException(\"...\") raises it on the spot, and execution jumps to the nearest matching catch — even one you wrote yourself a few lines down. You're both the troublemaker and the responder.",
        },
        {
          type: "code",
          lang: "java",
          text: "class Main {\n    public static void main(String[] args) {\n        int age = -5;\n        try {\n            if (age < 0) {\n                throw new IllegalArgumentException(\"Age cannot be negative\");\n            }\n            System.out.println(\"Age is fine\");\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Bad input: \" + e.getMessage());\n        }\n    }\n}",
        },
        {
          type: "callout",
          tone: "note",
          text: "e.getMessage() returns the exact text you passed to the exception, so your catch can echo the reason back.",
        },
        {
          type: "p",
          text: "Set int price = -10. In a try block, if price is negative, throw new IllegalArgumentException(\"Price cannot be negative\"). Catch it and print Rejected: followed by the message via e.getMessage().",
        },
      ],
      starter:
        "class Main {\n    public static void main(String[] args) {\n        int price = -10;\n        // TODO: in a try block, if price < 0 throw new IllegalArgumentException(\"Price cannot be negative\")\n        // TODO: catch it and print: Rejected: <message>\n        System.out.println(price);\n    }\n}\n",
      solution:
        "class Main {\n    public static void main(String[] args) {\n        int price = -10;\n        try {\n            if (price < 0) {\n                throw new IllegalArgumentException(\"Price cannot be negative\");\n            }\n            System.out.println(price);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Rejected: \" + e.getMessage());\n        }\n    }\n}\n",
      checks: [
        { label: "Throw your own exception", kind: "codeContains", value: "throw" },
        { label: "Use IllegalArgumentException", kind: "codeContains", value: "IllegalArgumentException" },
        { label: "Catch what you threw", kind: "codeContains", value: "catch" },
        { label: "Report the rejection", kind: "stdoutContains", value: "Rejected: Price cannot be negative" },
      ],
      hints: [
        "Inside try, guard it: if (price < 0) { throw new IllegalArgumentException(\"Price cannot be negative\"); }",
        "Catch the same type: catch (IllegalArgumentException e) { ... }.",
        "Inside the catch: System.out.println(\"Rejected: \" + e.getMessage());",
      ],
      wellDone: "You threw an exception, caught it, and reported it — you now control both ends of the error.",
    },
  ],
};
