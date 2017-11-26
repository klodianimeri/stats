import { IAggregateFunction } from './IAggregateFunction';

import {
    IAggregateFunction as QueryAggregateFunction, StatsError,
} from './../../../../core/index';

import {
    Avg as QueryAvg,
    Count as QueryCount,
    Max as QueryMax,
    Min as QueryMin,
    Sum as QuerySum
} from './../../../../query/index';

import { Avg } from './Avg';
import { Count } from './Count';
import { Max } from './Max';
import { Min } from './Min';
import { Sum } from './Sum';

export class ConvertAggregateFunction {
    public static ConvertAggregateFunction(queryAggregateFunction: QueryAggregateFunction): IAggregateFunction {
        if (queryAggregateFunction instanceof QueryAvg) {
            return new Avg(queryAggregateFunction.State()[0], queryAggregateFunction.State()[1], queryAggregateFunction.State()[2]);
        }
        if (queryAggregateFunction instanceof QueryCount) {
            return new Count(queryAggregateFunction.State()[0], queryAggregateFunction.State()[1], queryAggregateFunction.State()[2]);
        }
        if (queryAggregateFunction instanceof QueryMax) {
            return new Max(queryAggregateFunction.State()[0], queryAggregateFunction.State()[1], queryAggregateFunction.State()[2]);
        }
        if (queryAggregateFunction instanceof QueryMin) {
            return new Min(queryAggregateFunction.State()[0], queryAggregateFunction.State()[1], queryAggregateFunction.State()[2]);
        }
        if (queryAggregateFunction instanceof QuerySum) {
            return new Sum(queryAggregateFunction.State()[0], queryAggregateFunction.State()[1], queryAggregateFunction.State()[2]);
        }

        throw new StatsError(`SELECT AGGREGATE FUNCTION: Aggregate function not a valid type!`);
    }
}