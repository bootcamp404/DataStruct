package es.impulsalicante.ApiFuturaAlicante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@EnableJpaRepositories("es.impulsalicante.ApiFuturaAlicante.repository")//(exclude = {DataSourceAutoConfiguration.class })
public class ApiFuturaAlicanteApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiFuturaAlicanteApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*") // Permite todos los orígenes (en desarrollo)
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}

}
