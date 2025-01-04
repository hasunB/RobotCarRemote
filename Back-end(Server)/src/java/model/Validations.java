/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author hasun
 */
public class Validations {
    
    public static boolean isEmailValid(String email){
        return email.matches("^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    }
    
    public static boolean isPasswordValid(String password){
        return password.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    }
    
    public static boolean isDouble(String price){
        return price.matches("^\\d+(\\.\\d{2})?$");
    }
    
    public static boolean isInteger(String price){
        return price.matches("^\\d+$");
    }
    
    public static boolean isUsernameValid(String username){
        return username.matches("^[A-Za-z0-9_@]+$");
    }
    
    public static boolean isMobileValid(String mobile){
        return mobile.matches("^([+]\\d{2})?\\d{10}$");
    }
}
