export class IdGenerator {
  private static currentId = 0;
  private static readonly suffixMap = new Map<string, number>();

  /**
   * 生成随机字符串
   * @param length 长度
   */
  private static getRandomStr(length = 4): string {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }

  static next(suffix?: string): string {
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
