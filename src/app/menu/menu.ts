import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: "home",
    title: "Home",
    translate: "MENU.HOME",
    type: "item",
    icon: "home",
    url: "home",
  },
  // competition
  {
    id: "competitions",
    title: "Competition",
    translate: "MENU.APPS.COMPETITION.COLLAPSIBLE",
    type: "collapsible",
    icon: "anchor",
    children: [
      {
        id: "list",
        title: "List",
        translate: "MENU.APPS.COMPETITION.LIST",
        type: "item",
        icon: "circle",
        url: "competition/cardlist",
      },
      {
        id: "add",
        title: "Add",
        translate: "MENU.APPS.COMPETITION.ADD",
        type: "item",
        icon: "circle",
        url: "competition/add",
      },
    ],
  },
  // fish
  {
    id: "fishes",
    title: "Fish",
    translate: "MENU.APPS.FISH.COLLAPSIBLE",
    type: "collapsible",
    icon: "codesandbox",
    children: [
      {
        id: "list",
        title: "List",
        translate: "MENU.APPS.FISH.LIST",
        type: "item",
        icon: "circle",
        url: "fish/list",
      },
      {
        id: "add",
        title: "Add",
        translate: "MENU.APPS.FISH.ADD",
        type: "item",
        icon: "circle",
        url: "fish/add",
      },
    ],
  },
  // level
  {
    id: "levels",
    title: "Level",
    translate: "MENU.APPS.LEVEL.COLLAPSIBLE",
    type: "collapsible",
    icon: "bar-chart-2",
    children: [
      {
        id: "list",
        title: "List",
        translate: "MENU.APPS.LEVEL.LIST",
        type: "item",
        icon: "circle",
        url: "level/list",
      },
      {
        id: "add",
        title: "Add",
        translate: "MENU.APPS.LEVEL.ADD",
        type: "item",
        icon: "circle",
        url: "level/add",
      },
    ],
  },
];
