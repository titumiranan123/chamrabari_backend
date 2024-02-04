import { Schema, model } from "mongoose"

export interface Blog {
    img:string,
    title:string,
    description:string
}
const blogSchema = new Schema<Blog>({
    img:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
})

const blogModel = model<Blog>('blog',blogSchema);
export default  blogModel