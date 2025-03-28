package es.impulsalicante.ApiFuturaAlicante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories("es.impulsalicante.ApiFuturaAlicante.repository")//(exclude = {DataSourceAutoConfiguration.class })
public class ApiFuturaAlicanteApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiFuturaAlicanteApplication.class, args);
	}

}
