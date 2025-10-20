import { ArticleService } from "./article/article.service";
import { baseAjax } from "./instance";
import { RestaurantService } from "./restaurant/restaurant.service";

export const articleService = new ArticleService(baseAjax);
export const restaurantService = new RestaurantService(baseAjax);
