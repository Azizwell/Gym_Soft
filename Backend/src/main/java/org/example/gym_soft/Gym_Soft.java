package org.example.gym_soft;

import org.example.gym_soft.entity.MyBot;
import org.example.gym_soft.entity.SpringContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@SpringBootApplication
public class Gym_Soft {

	public static void main(String[] args) throws TelegramApiException {
		SpringApplication.run(Gym_Soft.class, args);

		TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
		telegramBotsApi.registerBot(SpringContext.getBean(MyBot.class));
	}
}
