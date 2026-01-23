export class IdGenerator {
    static currentId = 0;
    static suffixMap = new Map();
    static getRandomStr(length = 4) {
        return Math.random()
            .toString(36)
            .substring(2, 2 + length);
    }
    static next(suffix) {
        const randomPart = this.getRandomStr(4);
        if (!suffix) {
            this.currentId += 1;
            return `${randomPart}-${this.currentId}`;
        }
        const nextSuffixId = (this.suffixMap.get(suffix) ?? 0) + 1;
        this.suffixMap.set(suffix, nextSuffixId);
        return `${suffix}-${randomPart}-${nextSuffixId}`;
    }
}
//# sourceMappingURL=IdGenerator.js.map