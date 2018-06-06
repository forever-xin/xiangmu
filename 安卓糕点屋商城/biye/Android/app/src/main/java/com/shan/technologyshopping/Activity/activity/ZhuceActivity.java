package com.shan.technologyshopping.Activity.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

/**
 * 注册
 */

public class ZhuceActivity extends AppCompatActivity {


    private EditText userName;
    private EditText userPhone;
    private EditText userPwd;
    private TextView register;

    @Override protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_zhuce);
        userName = (EditText) findViewById(R.id.user_name);
        userPwd = (EditText) findViewById(R.id.user_pwd);
        userPhone = (EditText) findViewById(R.id.user_phone);

        register = (TextView) findViewById(R.id.register);
        register.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {

                String _userPhone = userPhone.getText().toString().trim();
                String _userPwd = userPwd.getText().toString().trim();
                if (_userPhone.equals("")) {
                    Toast.makeText(ZhuceActivity.this, "手机号不能为空", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (_userPhone.length() < 11) {
                    Toast.makeText(ZhuceActivity.this, "手机号格式不正确", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (_userPwd.equals("")) {
                    Toast.makeText(ZhuceActivity.this, "用户密码不能为空", Toast.LENGTH_SHORT).show();
                    return;
                }

                OkHttpUtils
                        .get()
                        .url(MyApplication.url + "register")
                        .addParams("buyer_name", userName.getText().toString().trim())
                        .addParams("unumber", userPhone.getText().toString().trim())
                        .addParams("upwd", userPwd.getText().toString().trim())
                        .build()
                        .execute(new StringCallback() {
                            @Override
                            public void onError(Request request, Exception e) {
                                Toast.makeText(ZhuceActivity.this, "注册失败", Toast.LENGTH_SHORT).show();
                            }

                            @Override
                            public void onResponse(String response) {
                                if (response.equals("{\"code\":100}")) {
                                    Toast.makeText(ZhuceActivity.this, "注册成功,请登录", Toast.LENGTH_SHORT).show();
                                    finish();
                                } else if (response.equals("{\"code\":101}")) {
                                    Toast.makeText(ZhuceActivity.this, "注册失败--用户已存在", Toast.LENGTH_SHORT).show();
                                }

                            }
                        });


            }
        });


    }
}
