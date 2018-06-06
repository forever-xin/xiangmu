package com.shan.technologyshopping.Activity.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.Request;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * describe:
 */

public class TestActivity extends AppCompatActivity {

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    @Override protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        findViewById(R.id.send).setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                Toast.makeText(TestActivity.this, "正在发送...", Toast.LENGTH_SHORT).show();

                JSONArray jsonArray = new JSONArray();
                for (int i = 0; i < 5; i++) {
                    JSONObject object = new JSONObject();
                    try {
                        object.put("user_id", "11111111111");
                        object.put("user_name", "2222222222");
                        object.put("user_phone", "33333333333");
                        object.put("user_address", "444444444444");
                        object.put("product_id", "5555555555");
                        object.put("product_name", "666666666666");
                        object.put("product_price", "77777777777");
                        object.put("product_count", "88888888888");
                    } catch (JSONException e) {
                        Log.i("lin", "---lin's log--->   进入 catch");
                        e.printStackTrace();
                    }
                    jsonArray.put(object);
                }
                String content = jsonArray.toString();
                Map<String, String> map = new HashMap<String, String>();
                map.put("test", jsonArray.toString());

//"Content-Type", "application/json"
                OkHttpUtils
                        .postString()
                        .url("http://192.168.202.107:3000/add_order_list")
                        .content(jsonArray.toString())
                        .mediaType(MediaType.parse("application/json; charset=utf-8"))
                        .build()
                        .execute(new StringCallback() {
                            @Override public void onError(Request request, Exception e) {
                                Toast.makeText(TestActivity.this, "error", Toast.LENGTH_SHORT).show();
                                ;
                            }

                            @Override public void onResponse(String response) {
                                Toast.makeText(TestActivity.this, "successed", Toast.LENGTH_SHORT).show();
                                ;

                            }
                        });


//
//                OkHttpUtils
//                        .post()
//                        .url("http://172.20.10.4:3008")
//                        .addParams("username", "hyman")
//                        .addParams("password", "123")
//                        .build()
//                        .execute(callback);

            }
        });
    }
}
