// 1 => Student.find er nam dilam QueryModel eita mongoose er query model 
// 2 => query hocche express er amra ja kichu pathabo shob query akare ashbe 

import { FilterQuery, Query } from "mongoose";


class QueryBuilder<T> {
    public modelQuery: Query<T[], any>  //come for mongoose
    public query: Record<string, unknown> //come for express 

    constructor(modelQuery: Query<T[], {}>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }


    // search impliment 
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm
        if (searchTerm) {
            this.modelQuery = this?.modelQuery?.find({
                $or: searchableFields.map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } }) as FilterQuery<T>)
            })
        }
        return this
    }

    // filter 
    filter() {
        const cloneQueryObject = { ...this.query }
        // remove from query 
        const removeQueryFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
        removeQueryFields.forEach(el => delete cloneQueryObject[el])
        this.modelQuery = this.modelQuery.find(cloneQueryObject as FilterQuery<T>)

        return this

    }

    // sort 
    sort() {
        const sort = this?.query?.sort || '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this
    }

    //paginateQuery 
    pagination() {
        const limit = Number(this.query.limit) || 10
        let page = Number(this.query.page) || 1
        const skip = (page - 1) * limit
        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this
    }

    // fields 
    fields (){
        const fields =  (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
        this.modelQuery = this.modelQuery.select(fields)
        return this 
    }




}


export default QueryBuilder