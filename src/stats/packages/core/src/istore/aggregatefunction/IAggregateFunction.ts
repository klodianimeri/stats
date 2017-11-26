export interface IAggregateFunction {
    State();
    Distinct(): IAggregateFunction;
    As(alias: string): IAggregateFunction;
}