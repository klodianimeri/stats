import { Database, Table, Store } from './../stats/packages/javascript/index';
import {
  Query,
  QueryResult,
  WhereExpression,
  BooleanOperator,
  ComparisonOperator,
  Avg,
  Count,
  Max,
  Min,
  Sum,
} from './../stats/packages/index';

import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    let person = new Table('person').ConstructFromObject({ Name: 'Klodi', Age: 4, Surname: 'Imeri', Registered: true, Birthday: new Date('29-05-1994') });
    let inventory = new Table('inventory').ConstructFromObject({ PersonName: 'Klodi', Product: 'TV', Amount: 1, Price: 435 });
    inventory.Column('PersonName').MakeForeignKey();
    person.Column('Name').MakePrimaryKey();

    //let database: Database = new Database('mydatabase', person, inventory);
    let store: Store = new Store('mydatabase', person, inventory);

    let query = new Query();
    query.setStore(store);

    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodi', 22, 'Imeri'));
    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Diklo', 25, 'Imeri'));
    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodi', 25, 'Imeri'));
    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodian', 23, 'Imeri'));
    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodian', 23, 'Imeri'));
    query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodiani', 24, 'Imeri'));
    //query.Insert(i => i.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodiania', 24, 'Imeri'));

    query.Insert(i => i.Insert('PersonName', 'Product', 'Amount', 'Price').Into('inventory').Values('Diklo', 'TV', 1, 356));
    query.Insert(i => i.Insert('PersonName', 'Product', 'Amount', 'Price').Into('inventory').Values('Klodi', 'TV', 1, 657));
    query.Insert(i => i.Insert('PersonName', 'Product', 'Amount', 'Price').Into('inventory').Values('Diklo', 'TV', 1, 356));
    query.Insert(i => i.Insert('PersonName', 'Product', 'Amount', 'Price').Into('inventory').Values('Diklo', 'TV', 1, 356));
    query.Insert(i => i.Insert('PersonName', 'Product', 'Amount', 'Price').Into('inventory').Values('Diklo', 'TV', 1, 356));

    //console.log('insertResult', insertResult);
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodi', 22, 'Imeri').End();
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Diklo', 25, 'Imeri').End();
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodi', 25, 'Imeri').End();
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodian', 23, 'Imeri').End();
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodian', 23, 'Imeri').End();
    // query.Insert('Name', 'Age', 'Surname').Into('person').Values('Klodiani', 24, 'Imeri').End();
    // query.Insert('Age', 'Surname').Into('person').Values(24, 'Imeri').End();

    // query.Insert('PersonName', 'Product', 'Amount', 'Price').Values('Diklo', 'TV', 1, 356).Into('inventory').End();
    // query.Insert('PersonName', 'Product', 'Amount', 'Price').Values('Klodi', 'TV', 1, 657).Into('inventory').End();
    // query.Insert('PersonName', 'Product', 'Amount', 'Price').Values('Diklo', 'TV', 1, 356).Into('inventory').End();
    // query.Insert('PersonName', 'Product', 'Amount', 'Price').Values('Diklo', 'TV', 1, 356).Into('inventory').End();


    // let result = query
    //   // .Delete()
    //   // .From(person)
    //   // .Where(new WhereExpression(BooleanOperator.And, 'Name', ComparisonOperator.Equal, 'Klodi'),
    //   // new WhereExpression(BooleanOperator.Or, 'Age', ComparisonOperator.Equal, 25)).End();
    //   .Select('Name', 'Surname', 'Age')
    //   //.Distinct('Name', 'Surname')
    //   .From('person')
    //   .Where(new WhereExpression(BooleanOperator.And, 'Age', ComparisonOperator.Between, [23, 24]),
    //   new WhereExpression(BooleanOperator.And, 'Surname', ComparisonOperator.Equal, 'Imeri'))
    //   // .OrderDescending('Age')
    //   // .OrderAscending('Age')
    //   // .OrderAscending('Name')
    //   .End();

    let result = query.Select(s => s.Select(
      '*'
      // 'Name',
      // 'Age',
      // 'Price',
      // new Avg('Age').Distinct().As('Avarage'),
      // new Count('Age').Distinct().As('Count'),
      // new Sum('Age').Distinct().As('Sum'),
      // new Min('Age').Distinct().As('Min'),
      // new Max('Age').Distinct().As('Max')
    )
      //.Limit(4)
      .From('person')
      .GroupBy('Name', 'Age')
      //   .Where(
      //   new WhereExpression(BooleanOperator.And, 'Name', ComparisonOperator.Equal, 'Klodi'),
      //   //new WhereExpression(BooleanOperator.Not, 'Name', ComparisonOperator.Equal, 'Klodi'),
      //   //new WhereExpression(BooleanOperator.And, 'Age', ComparisonOperator.Between, [23, 25])
      // )
      .OrderDescending('Age')
      // .InnerJoin('inventory')
      // .On('Name', 'PersonName')
    );
    console.log('result', result);

    query.Update(u => u.Update('person').Set(['Ager', 23], ['Naeme', 'Dioklocian']).Where(new WhereExpression(BooleanOperator.And, 'Name', ComparisonOperator.Equal, 'Diklo')));
    // console.log(result);
    // console.log(inventory);

    // let innerJoinResult = query.Select('person.Name', 'inventory.Product', 'inventory.Price')
    //   .From('person')
    //   .Where(new WhereExpression(BooleanOperator.And, 'Name', ComparisonOperator.Equal, 'Klodi'),
    //   new WhereExpression(BooleanOperator.Or, 'Name', ComparisonOperator.Equal, 'Diklo'))
    //   .OrderDescending('Age')
    //   .InnerJoin('inventory')
    //   .On('Name', 'PersonName')
    //   .End();

    console.log(query);

  }
}
