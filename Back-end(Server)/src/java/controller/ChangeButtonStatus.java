/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import entity.Vehicle;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author hasun
 */
@WebServlet(name = "ChangeButtonStatus", urlPatterns = {"/ChangeButtonStatus"})
public class ChangeButtonStatus extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);

        try {

            String userId = req.getParameter("id");
            String status = req.getParameter("Status");
            String ButtonName = req.getParameter("Button");

            if (userId == null || status == null || ButtonName == null) {
                responseJson.addProperty("message", "Invalid parameters");
                return;
            }

            //logged user
            User loggedUser = (User) session.get(User.class, Integer.valueOf(userId));

            //get car
            Criteria searchCar = session.createCriteria(Vehicle.class);
            searchCar.add(Restrictions.eq("user", loggedUser));

            //get car list
            List<Vehicle> vehicleList = searchCar.list();

            if (vehicleList.isEmpty()) {
                responseJson.addProperty("message", "Vehicle not found");
            } else {
                for (Vehicle car : vehicleList) {

                    if ("lock".equals(ButtonName)) {
                        if ("true".equals(status)) {
                            car.setWheel_lock((int) 1);
                        } else {
                            car.setWheel_lock((int) 2);
                        }
                    } else if("up".equals(ButtonName)){
                        if ("true".equals(status)) {
                            car.setForward((int) 1);
                        } else {
                            car.setForward((int) 2);
                        }
                    } else if("down".equals(ButtonName)){
                        if ("true".equals(status)) {
                            car.setBackward((int) 1);
                        } else {
                            car.setBackward((int) 2);
                        }
                    } else if("left".equals(ButtonName)){
                        if ("true".equals(status)) {
                            car.setLeft((int) 1);
                        } else {
                            car.setLeft((int) 2);
                        }
                    } else if("right".equals(ButtonName)){
                        if ("true".equals(status)) {
                            car.setRight((int) 1);
                        } else {
                            car.setRight((int) 2);
                        }
                    } else {
                        responseJson.addProperty("message", "Invalid button");
                    }

                    session.update(car);

                    responseJson.addProperty("Status", status);
                    responseJson.addProperty("success", true);
                    responseJson.addProperty("btn", ButtonName);

                }
                System.out.println(ButtonName);
                System.out.println(status);
                session.beginTransaction().commit();

            }

        } catch (NumberFormatException | HibernateException e) {
            e.printStackTrace();
            responseJson.addProperty("message", "Internal Server Error");
        } finally {
            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseJson));

    }

}
