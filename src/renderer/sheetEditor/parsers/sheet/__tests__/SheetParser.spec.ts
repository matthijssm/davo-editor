import { KeyUtils } from "../../utils/KeyUtils";
import { SheetParser } from "../SheetParser";

describe("sheetEditor.parsers.sheet.SheetParser", () => {
    it("should parse sheet parts correctly", () => {
        const sheetParts = `[Verse 1]
Em7                  D                       C
   Before I spoke a word, You were singing over me
Em7               D              C
   You have been so, so good to me
Em7                 D                          C
   Before I took a breath, You breathed Your life in me
Em7               D              C
   You have been so, so kind to me  `;

        const key = KeyUtils.fromString("G");

        const parts = SheetParser.parsePartial(sheetParts, key);

        expect(parts.length).toBe(1);
        expect(parts[0].lines.length).toBe(5);
        expect(parts[0].lines[0].content).toBe("[Verse 1]");
        expect(parts[0].lines[1].content).toBe("   Before I spoke a word, You were singing over me  ");
        expect(parts[0].lines[1].chords[0].toAlphabethString(key)).toBe("Em7");
        expect(parts[0].lines[1].chords.length).toBe(3);
        expect(parts[0].lines[1].chords[0].position).toBe(0);
    });

    it("should parse simple lines", () => {
        const sheetParts = `Before I spoke a word, You were singing over me
You have been so, so good to me
Before I took a breath, You breathed Your life in me
You have been so, so kind to me  `;

        const key = KeyUtils.fromString("G");

        const parts = SheetParser.parsePartial(sheetParts, key);

        expect(parts.length).toBe(1);
        expect(parts[0].lines.length).toBe(4);
        expect(parts[0].lines[0].hasChords).toBeFalsy();
        expect(parts[0].lines[0].content).toBe("Before I spoke a word, You were singing over me");
    });

    describe("Complete sheet", () => {
        it("should parse a complete sheet", () => {
            const key = KeyUtils.fromString("G");

            const parts = SheetParser.parsePartial(completeSheet, key);

            expect(parts.length).toBe(7);
            expect(parts[0].lines.length).toBe(5);
            expect(parts[0].lines[0].content).toBe("[Verse 1]");
            expect(parts[0].lines[1].content).toBe("   Before I spoke a word, You were singing over me  ");
            expect(parts[0].lines[1].chords[0].toAlphabethString(key)).toBe("Em7");
            expect(parts[0].lines[1].chords.length).toBe(3);
            expect(parts[0].lines[1].chords[0].position).toBe(0);
        });
    });
});

const completeSheet = `[Verse 1]
Em7                  D                       C
   Before I spoke a word, You were singing over me
Em7               D              C
   You have been so, so good to me
Em7                 D                          C
   Before I took a breath, You breathed Your life in me
Em7               D              C
   You have been so, so kind to me

[Chorus]
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God
       Em7              D                       C                 G
Oh, it chases me down, fights 'till I'm found, leaves the ninety nine
           Em7               D                      C             G
I couldn't earn it  I don't deserve it  Still, You give yourself away
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God

[Verse 2]
Em7                  D                    C
   When I was Your foe, still Your love fought for me
Em7               D              C
   You have been so, so good to me
Em7                 D                  C
   When I felt no worth, You paid it all for me
Em7               D              C
   You have been so, so kind to me

[Chorus]
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God
       Em7              D                       C                 G
Oh, it chases me down, fights 'till I'm found, leaves the ninety nine
           Em7               D                      C             G
I couldn't earn it  I don't deserve it  Still, You give yourself away
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God

[Bridge] play softly 2x
Em7                          D                            C                      G
There's no shadow You won't light up, mountain You won't climb up, coming after me
Em7                        D                            C                      G
There's no wall You won't kick down, no lie You won't tear down, coming after me

(Play more loudly) 2x
Em7                           D                            C                     G
There's no shadow You won't light up, mountain You won't climb up, coming after me
Em7                         D                           C                      G
There's no wall You won't kick down, no lie You won't tear down, coming after me

[Chorus]
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God
       Em7              D                       C                 G
Oh, it chases me down, fights 'till I'm found, leaves the ninety nine
           Em7               D                      C             G
I couldn't earn it  I don't deserve it  Still, You give yourself away
       Em7            D             C                G
Oh the overwhelming, never ending, reckless love of God`;
