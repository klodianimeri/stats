export interface IFunction {
    State();
    Distinct(): IFunction;
    As(alias: string): IFunction;
}