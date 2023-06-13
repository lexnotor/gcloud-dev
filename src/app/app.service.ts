import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PostInfo } from "..";
import { randomUUID } from "crypto";

@Injectable()
export class AppService {
    data: PostInfo[] = [];

    getHello(): string {
        return "Hello World!";
    }

    addPost(postData: PostInfo): PostInfo {
        const post: PostInfo = {
            author: postData.author,
            content: postData.content,
            created_at: new Date().toISOString(),
            deleted_at: null,
            updated_at: new Date().toISOString(),
            id: randomUUID(),
        };
        this.data.push(post);

        return post;
    }

    getPost(id: string): PostInfo {
        const post = this.data.find(
            (item) => item.id == id && !item.deleted_at,
        );

        if (!post)
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        return post;
    }

    getPosts(): PostInfo[] {
        return this.data.filter((item) => !item.deleted_at);
    }

    updatePosts(postData: PostInfo): PostInfo {
        const post = this.data.find(
            (item) => item.id == postData.id && !item.deleted_at,
        );

        if (!post)
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);

        post.updated_at = new Date().toISOString();
        if (postData.author) post.author = postData.author;
        if (postData.content) post.author = postData.content;
        return post;
    }

    deletePost(id: string): string {
        const post = this.data.find(
            (item) => item.id == id && !item.deleted_at,
        );

        if (!post)
            throw new HttpException("Post not exit", HttpStatus.NOT_FOUND);

        post.deleted_at = new Date().toISOString();
        return id;
    }
}
