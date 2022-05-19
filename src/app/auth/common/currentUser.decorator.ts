/**
 * Подставляет в обработчик запроса текущего пользователя из HTTP-контекста
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
	(data, context: ExecutionContext) => {
		let ctx: any;

		if (context.getType() === 'http') {
			ctx = context.switchToHttp().getRequest();
		}

		return ctx.user;
	},
);
