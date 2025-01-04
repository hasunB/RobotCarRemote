/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Backward;
import entity.Forward;
import entity.Left;
import entity.Right;
import entity.User;
import entity.User_Status;
import entity.Vehicle;
import entity.Vehicle_Status;
import entity.Wheel_lock;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author hasun
 */
@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);

        JsonObject jsonobject = gson.fromJson(req.getReader(), JsonObject.class);
        String email = jsonobject.get("email").getAsString();
        String name = jsonobject.get("name").getAsString();
        String username = jsonobject.get("username").getAsString();
        String password = jsonobject.get("password").getAsString();

        if (email.isEmpty()) {
            responseJson.addProperty("message", "Enter your email");
        } else if (!Validations.isEmailValid(email)) {
            responseJson.addProperty("message", "Invalid Email");
        } else if (name.isEmpty()) {
            responseJson.addProperty("message", "Enter your Name");
        } else if (username.isEmpty()) {
            responseJson.addProperty("message", "Enter your Username");
        } else if (!Validations.isUsernameValid(username)) {
            responseJson.addProperty("message", "Invalid username");
        } else if (password.isEmpty()) {
            responseJson.addProperty("message", "Enter your password");
        } else if (!Validations.isPasswordValid(password)) {
            responseJson.addProperty("message", "Password Must Contain Minimum eight characters, at least one letter and one number");
        } else {

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria emailSearch = session.createCriteria(User.class);
            emailSearch.add(Restrictions.eq("email", email));

            if (!emailSearch.list().isEmpty()) {
                responseJson.addProperty("message", "Email Already Exists");
            } else {
                       
                    User user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    user.setUsername(username);
                    user.setMobile("00000000");
                    user.setPassword(password);
                    user.setCountry_code("00");
                    user.setDatetime(new Date());
                    user.setStatus((int) 1);

                    user.setProfile("none");
                    
                    Vehicle car = new Vehicle();
                    car.setVehicle_status((int) 2);
                    car.setForward((int) 2);
                    car.setBackward((int) 2);
                    car.setLeft((int) 2);
                    car.setRight((int) 2);
                    car.setWheel_lock((int) 2);
                    car.setUser(user);

                    session.save(user);
                    session.save(car);
                    session.beginTransaction().commit();

                    responseJson.addProperty("success", true);
                    responseJson.addProperty("message", "Registration Complete");
                
            }

            session.close();

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));

    }

}
