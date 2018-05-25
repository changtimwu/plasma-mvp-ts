
export default class Calculator {
    public Add(a: number, b: number): number {
        return a + b;
    }
    public SlowAdd(a: number, b: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => resolve(a + b), 1000)
        })
    }
}

