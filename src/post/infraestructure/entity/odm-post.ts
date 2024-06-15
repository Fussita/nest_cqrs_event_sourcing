import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class OdmPost extends Document {
    @Prop({ unique: true, required: true })   
    //@Prop({ unique: true, index: true, required: true })   
    id_post: string
    @Prop({ unique: false, index: false, required: true })   
    content: string
    @Prop({ unique: false, index: false, required: false })
    last_modified_date: Date
}

export const OdmPostSchema = SchemaFactory.createForClass( OdmPost )