package com.shan.technologyshopping.Activity.activity;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    private EditText userName;
    private EditText userPwd;
    private TextView register;
    private TextView login;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        userName = (EditText) findViewById(R.id.user_name);
        userPwd = (EditText) findViewById(R.id.user_pwd);

        register = (TextView) findViewById(R.id.register);
        login = (TextView) findViewById(R.id.login);

        register.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                //安卓中跳转需要用到的方法，参数：1.当前activity  2.目标activity
                Intent intent = new Intent(LoginActivity.this, ZhuceActivity.class);
                startActivity(intent);
                //跳转完毕
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {

                String _userPhone = userName.getText().toString().trim();
                String _userPwd = userPwd.getText().toString().trim();
                if (_userPhone.equals("")) {
                    Toast.makeText(LoginActivity.this, "手机号不能为空", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (_userPhone.length() < 11) {
                    Toast.makeText(LoginActivity.this, "手机号格式不正确", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (_userPwd.equals("")) {
                    Toast.makeText(LoginActivity.this, "用户密码不能为空", Toast.LENGTH_SHORT).show();
                    return;
                }

                OkHttpUtils
                        .get()
                        .url(MyApplication.url + "login")
                        .addParams("unumber", userName.getText().toString().trim())
                        .addParams("upwd", userPwd.getText().toString().trim())
                        .build()
                        .execute(new StringCallback() {
                            @Override
                            public void onError(Request request, Exception e) {
                                Toast.makeText(LoginActivity.this, "登录失败", Toast.LENGTH_SHORT).show();
                                Log.e("aaa","---lin--->  response " + e.toString());

                            }

                            @Override
                            public void onResponse(String response) {

                                Log.e("aaa","---lin--->  response " + response);

                                JSONObject result = null;
                                try {
                                    result = new JSONObject(response);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                                if (result.optInt("code") == 100) {
                                    //缓存，缓存到手机本地，以文件的方式进行缓存
                                    SharedPreferences sharedPreferences = getSharedPreferences("user",
                                            Activity.MODE_PRIVATE);
                                    SharedPreferences.Editor editor = sharedPreferences.edit();
                                    //用putString的方法保存数据
                                    editor.putString("phone", userName.getText().toString());
                                    editor.putString("pwd", userPwd.getText().toString());
                                    editor.putString("name", result.optString("username"));
                                    //提交当前数据
                                    editor.apply();
                                    Toast.makeText(LoginActivity.this, "登录成功", Toast.LENGTH_SHORT).show();
                                    //跳转
                                    Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                                    startActivity(intent);
                                    finish();

                                } else {
                                    Toast.makeText(LoginActivity.this, "登录失败", Toast.LENGTH_SHORT).show();
                                }
                            }
                        });
            }
        });

    }
}
