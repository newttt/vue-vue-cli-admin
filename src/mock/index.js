import Mock from "mockjs";

Mock.mock(/\/linechart/,{
    "data|5":[{
        "value|200-1000":0

    }]
})

Mock.mock(/\/userlist/,{
    "data|30":[{
        "name":"@cname",
        "id|+1":1,
        "address":"@county(true)",
        "sex":"@boolean",
        "birthday":"@datetime('yyyy-MM-dd')",
        "blacklist": "@boolean",
        "icon":"@image('80x80','ccc','jpg','icon')",
        "level|0-6":0
    }]
})