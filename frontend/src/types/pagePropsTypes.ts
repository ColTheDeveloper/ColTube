export type userType={
    _id:string,
    img:string,
    name:string,
    email:string,
    subscribers:number,
    subscribedUsers:string[]
}

export type commentType={
    _id:string,
    userId:string,
    videoId:string,
    desc:string,
    createdAt:string
}

export type videoType={
    _id:string,
    imgUrl:string,
    videoUrl:string,
    desc:string,
    createdAt:string,
    title:string,
    subscribers:string,
    views:number,
    likes:string[],
    dislikes:string[],
    tags:string[],
    userId:string

}

export type videoIdProps={
    videoId:string
}

export type commentProps={
    comment:commentType,
}