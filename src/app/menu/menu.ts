import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'sample',
    title: 'Sample',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'file',
    url: 'sample'
  },
  // level
    {
        id: 'levels',
        title: 'Level',
        translate: 'MENU.APPS.LEVEL.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'bar-chart-2',
        children: [
        {
            id: 'list',
            title: 'List',
            translate: 'MENU.APPS.LEVEL.LIST',
            type: 'item',
            icon: 'circle',
            url: 'level/list'
        },
        {
            id: 'add',
            title: 'Add',
            translate: 'MENU.APPS.LEVEL.ADD',
            type: 'item',
            icon: 'circle',
            url: 'level/add'
        }
        ]
    },
]
