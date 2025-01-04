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
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author hasun
 */
@WebServlet(name = "sendStatus", urlPatterns = {"/sendStatus"})
public class sendStatus extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        Session session = HibernateUtil.getSessionFactory().openSession();
        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", false);

        try {

            String userId = req.getParameter("id");
            String status = req.getParameter("Status");

            if (userId == null || status == null) {
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

                    if ("1".equals(status)) {
                        if (car.getVehicle_status() == 1) {
                            if (car.getForward() == 1) {
                                responseJson.addProperty("message", "Forward");
                                responseJson.addProperty("success", true);
                            } else if (car.getBackward() == 1) {
                                responseJson.addProperty("message", "Backward");
                                responseJson.addProperty("success", true);
                            } else if (car.getLeft() == 1) {
                                responseJson.addProperty("message", "Left");
                                responseJson.addProperty("success", true);
                            } else if (car.getRight() == 1) {
                                responseJson.addProperty("message", "Right");
                                responseJson.addProperty("success", true);
                            } else {
                                responseJson.addProperty("message", "Stop");
                            }
                        } else {
                            responseJson.addProperty("message", "Vehicle Stopped");
                        }
                    } else {
                        responseJson.addProperty("message", "Vehicle Stopped");
                    }

                }

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
