/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author hasun
 */
@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "vehicle_status_id")
    private int vehicle_status;
    
    
    @Column(name = "forward_id")
    private int forward;
    
    
    @Column(name = "backward_id")
    private int backward;
    
    
    @Column(name = "left_id")
    private int left;
    

    @Column(name = "right_id")
    private int right;
    
    
    @Column(name = "wheel_lock_id")
    private int wheel_lock;
    
    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVehicle_status() {
        return vehicle_status;
    }

    public void setVehicle_status(int vehicle_status) {
        this.vehicle_status = vehicle_status;
    }

    public int getForward() {
        return forward;
    }

    public void setForward(int forward) {
        this.forward = forward;
    }

    public int getBackward() {
        return backward;
    }

    public void setBackward(int backward) {
        this.backward = backward;
    }

    public int getLeft() {
        return left;
    }

    public void setLeft(int left) {
        this.left = left;
    }

    public int getRight() {
        return right;
    }

    public void setRight(int right) {
        this.right = right;
    }

    public int getWheel_lock() {
        return wheel_lock;
    }

    public void setWheel_lock(int wheel_lock) {
        this.wheel_lock = wheel_lock;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    
    
    
    
}
