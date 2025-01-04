/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);

        JsonObject jsonObject = gson.fromJson(req.getReader(), JsonObject.class);
        String email = jsonObject.get("email").getAsString();
        String password = jsonObject.get("password").getAsString();

        if (email.isEmpty()) {
            responseJson.addProperty("message", "Enter Email");
        } else if (!Validations.isEmailValid(email)) {
            responseJson.addProperty("message", "Invalid Email");
        } else if (password.isEmpty()) {
            responseJson.addProperty("message", "Enter password");
        } else {

            Session session = HibernateUtil.getSessionFactory().openSession();

            Criteria userSearch = session.createCriteria(User.class);
            userSearch.add(Restrictions.eq("email", email));
            userSearch.add(Restrictions.eq("password", password));

            if (!userSearch.list().isEmpty()) {

                User user = (User) userSearch.uniqueResult();
                responseJson.add("user", gson.toJsonTree(user));
                responseJson.addProperty("success", true);
                responseJson.addProperty("message", "Success");

            } else {
                responseJson.addProperty("message", "Incorrect Email or password");
            }

            session.close();

        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));

    }

}
