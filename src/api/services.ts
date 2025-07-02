import { ArticleService } from "./article/article.service";
import { baseAjax } from "./instance";

export const articleService = new ArticleService(baseAjax);
