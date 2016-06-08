package com.fang.web.controller;

import com.fang.entity.UserInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Jameslin on 16/5/25.
 */
@Controller
@RequestMapping(value = "/user")
public class UserInfoController {
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public String userList(Model model){
        UserInfo user = new UserInfo("zhangsansan","zss123",new Date());
        model.addAttribute(user);
        return "/user/list";
    }
}
