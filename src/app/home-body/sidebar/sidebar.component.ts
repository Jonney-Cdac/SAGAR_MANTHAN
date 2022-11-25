import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';



/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'LRIT',
    children: [{name: 'Option1'}, {name: 'Option2'}, {name: 'Option3'}],
  },
  {
    name: 'INCOIS',
    children: [
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
    ],
  },
  {
    name: 'IMD',
    children: [
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
    ],
  },
  {
    name: 'DGLL',
    children: [
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
    ],
  },
  {
    name: 'Exact Earth',
    children: [
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
      {
        name: 'Option1',
        children: [{name: 'Item1'}, {name: 'Item2'}],
      },
    ],
  },
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}