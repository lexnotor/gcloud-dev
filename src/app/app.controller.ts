import {
    Body,
    Controller,
    Delete,
    Get,
    NotAcceptableException,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiResponse, PostInfo } from "..";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    addPost(@Body() payload: PostInfo): ApiResponse {
        if (!payload || !payload.author || !payload.content)
            throw new NotAcceptableException();
        return {
            message: "Post found",
            data: this.appService.addPost(payload),
        };
    }

    @Get()
    getPosts(): ApiResponse<PostInfo[]> {
        return { message: "Post found", data: this.appService.getPosts() };
    }

    @Get(":id")
    getPost(@Param("id") id: string): ApiResponse<PostInfo> {
        return { message: "Post found", data: this.appService.getPost(id) };
    }

    @Patch(":id")
    updatePost(
        @Param("id") id: string,
        @Body() payload: PostInfo,
    ): ApiResponse<PostInfo> {
        if (!payload) throw new NotAcceptableException();

        return {
            message: "Post updated",
            data: this.appService.updatePosts({ ...payload, id }),
        };
    }

    @Delete(":id")
    deletePost(@Param(":id") id: string): ApiResponse<string> {
        return { message: "Post delete", data: this.appService.deletePost(id) };
    }
}
