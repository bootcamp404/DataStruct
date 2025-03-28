package es.impulsalicante.ApiFuturaAlicante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


<<<<<<< HEAD
@SpringBootApplication
@EnableJpaRepositories("es.impulsalicante.ApiFuturaAlicante.repository")
//(exclude = {DataSourceAutoConfiguration.class }) // no se necesite BD para ejecutar el programa
=======
@SpringBootApplication//(exclude = {DataSourceAutoConfiguration.class }) // no se necesite BD para ejecutar el programa
>>>>>>> b912c6e70e819727d5f630e1ef30f1ba8be29bf8
public class ApiFuturaAlicanteApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiFuturaAlicanteApplication.class, args);
	}

}
