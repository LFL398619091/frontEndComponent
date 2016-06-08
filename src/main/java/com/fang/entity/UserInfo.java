package com.fang.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Jameslin on 16/5/25.
 */
public class UserInfo {
    private String userName;
    private String password;
    private Date createTime;

    public UserInfo(String userName, String password, Date createTime) {
        this.userName = userName;
        this.password = password;
        this.createTime = createTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "UserInfo{" +
                "userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", createTime=" + createTime +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserInfo userInfo = (UserInfo) o;

        if (userName != null ? !userName.equals(userInfo.userName) : userInfo.userName != null) return false;
        if (password != null ? !password.equals(userInfo.password) : userInfo.password != null) return false;
        return createTime != null ? createTime.equals(userInfo.createTime) : userInfo.createTime == null;

    }

    @Override
    public int hashCode() {
        int result = userName != null ? userName.hashCode() : 0;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (createTime != null ? createTime.hashCode() : 0);
        return result;
    }
}
