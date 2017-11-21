import {
  QueryResult,
  Select,
  Insert,
  Update,
  Delete
} from './../../../index';

export interface IStore {
  Insert(queryInsert: Insert): QueryResult;
  Select(querySelect: Select): QueryResult;
  Delete(queryDelete: Delete): QueryResult;
  Update(queryUpdate: Update): QueryResult;
}
