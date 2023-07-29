interface Item {
    text: string, link: string, items: Item[] | undefined
}
const rootPath = "/ruankao/";
const gaoxiangPath = "/ruankao/gaoxiang/";
const Data: Item = {
    text: '软考', link: 'rootPath', items: [
        {
            text: '信息系统项目管理', link: `${rootPath}/gaoxiang/`, 
            items: [
                { text: '信息化发展', link: `${gaoxiangPath}/信息化发展`,items:undefined},
                { text: '信息技术发展', link: `${gaoxiangPath}/信息技术发展`,items:undefined}, 
                { text: '信息系统治理', link: `${gaoxiangPath}/信息系统治理`,items:undefined},
                { text: '信息系统管理', link: `${gaoxiangPath}/信息系统管理`,items:undefined},
                { text: '信息系统管理', link: `${gaoxiangPath}/信息系统管理`,items:undefined},
            ]
        }
    ]
}

export default Data;