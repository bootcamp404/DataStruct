package es.impulsalicante.ApiFuturaAlicante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class }) // no se necesite BD para ejecutar el programa
public class ApiFuturaAlicanteApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiFuturaAlicanteApplication.class, args);
	}

}
