package com.shan.technologyshopping.Activity.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.adapter.WashGridviewAdapter;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.Activity.model.GoodsModel;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

/**
 * 搜索界面
 */
public class SearchActivity extends AppCompatActivity implements View.OnClickListener {

    private ImageView back, search;
    private EditText content;
    private GridView gridView;

    private List<GoodsModel> list;
    private PopupWindow window;
    private ImageView fr_page_cuts;
    private ImageView fr_page_plus;
    private ImageView fr_page_picture;
    private Button fr_page_sure;
    private TextView fr_page_amounts;
    private TextView fr_page_num;
    private TextView fr_page_bag;
    private GoodsModel goodsModel;
    private TextView describe;
    private int i = 1;
    private int positionCount;

    private String _search = "火爆蛋糕";

    private ImageView xing;
    private int mPosition;

    private TextView search_result_null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        back = (ImageView) findViewById(R.id.ac_search_back);
        search = (ImageView) findViewById(R.id.ac_search_search);
        content = (EditText) findViewById(R.id.ac_search_content);
        gridView = (GridView) findViewById(R.id.ac_search);
        search_result_null = (TextView) findViewById(R.id.search_result_null);
        initPopouWindow();

        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                showPopouWindo(position);
                if (null != window && window.isShowing()) {
                    window.dismiss();
                } else {
                    window.showAtLocation(gridView, Gravity.BOTTOM, 10, 10);
                }
            }
        });

        back.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                finish();
            }
        });

        search.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(final View view) {
                Toast.makeText(SearchActivity.this, "正在搜索...", Toast.LENGTH_SHORT).show();

                OkHttpUtils
                        .get()
                        .url(MyApplication.url + "search")
                        .addParams("key", content.getText().toString().trim())
                        .build()
                        .execute(new StringCallback() {
                            @Override
                            public void onError(Request request, Exception e) {

                            }

                            @Override
                            public void onResponse(String response) {
                                list = new ArrayList<GoodsModel>();
                                try {
                                    JSONArray jsonArray = new JSONArray(response);
                                    if (jsonArray.length() == 0){
                                        search_result_null.setVisibility(View.VISIBLE);
                                    }else {
                                        search_result_null.setVisibility(View.GONE);
                                    }
                                    for (int i = 0; i < jsonArray.length(); i++) {
                                        GoodsModel model = new GoodsModel(jsonArray.getJSONObject(i).optString("id"),
                                                jsonArray.getJSONObject(i).optString("items"),
                                                MyApplication.url + jsonArray.getJSONObject(i).optString("picture"),
                                                jsonArray.getJSONObject(i).optString("price"),
                                                jsonArray.getJSONObject(i).optString("describe").split(" ")[0],
                                                jsonArray.getJSONObject(i).optString("describe").split(" ")[1],
                                                "",
                                                ""
                                        );
                                        list.add(model);
                                    }

                                } catch (JSONException e) {
                                    search_result_null.setVisibility(View.VISIBLE);
                                    e.printStackTrace();
                                }
                                gridView.setAdapter(new WashGridviewAdapter(SearchActivity.this, list));
                            }
                        });
            }
        });

        Intent intent = getIntent();
        String type = intent.getExtras().getString("type2");
        content.setText(type);
        switch (type) {
            case "火爆蛋糕":
                _search = "火爆蛋糕";
                break;

            case "热门面包":
                _search = "热门面包";
                break;

            case "香喷饼干":
                _search = "香喷饼干";
                break;

//            case "小白鞋":
//                _search = "小白鞋";
//                break;
        }

        OkHttpUtils
                .get()
                .url(MyApplication.url + "search")
                .addParams("key", _search)
                .build()
                .execute(new StringCallback() {
                    @Override
                    public void onError(Request request, Exception e) {
                    }

                    @Override
                    public void onResponse(String response) {
                        list = new ArrayList<GoodsModel>();
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            if (jsonArray.length() == 0){
                                search_result_null.setVisibility(View.VISIBLE);
                            }else {
                                search_result_null.setVisibility(View.GONE);
                            }

                            for (int i = 0; i < jsonArray.length(); i++) {
                                GoodsModel model = new GoodsModel(jsonArray.getJSONObject(i).optString("id"),
                                        jsonArray.getJSONObject(i).optString("items"),
                                        MyApplication.url + jsonArray.getJSONObject(i).optString("picture"),
                                        jsonArray.getJSONObject(i).optString("price"),
                                        jsonArray.getJSONObject(i).optString("describe").split(" ")[0],
                                        jsonArray.getJSONObject(i).optString("describe").split(" ")[1],
                                        "",
                                        ""
                                );
                                list.add(model);
                            }
                        } catch (JSONException e) {
                            search_result_null.setVisibility(View.VISIBLE);
                            e.printStackTrace();
                        }
                        gridView.setAdapter(new WashGridviewAdapter(SearchActivity.this, list));
                    }
                });

    }

    private void initPopouWindow() {
        View view = LayoutInflater.from(this).inflate(R.layout.fragment_page_shangpinxiangqing, null);
        window = new PopupWindow(view, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, true);
        window.setFocusable(true);// 加上这个popupwindow中的ListView才可以接收点击事件
        ColorDrawable dw = new ColorDrawable(0xb0000000);
        //设置SelectPicPopupWindow弹出窗体的背景
        window.setBackgroundDrawable(dw);
        window.setOutsideTouchable(true);// 触摸popup
        fr_page_picture = (ImageView) view.findViewById(R.id.fr_page_picture);
        fr_page_bag = (TextView) view.findViewById(R.id.fr_page_bag);
        fr_page_amounts = (TextView) view.findViewById(R.id.fr_page_amounts);
        fr_page_cuts = (ImageView) view.findViewById(R.id.fr_page_cuts);
        fr_page_num = (TextView) view.findViewById(R.id.fr_page_num);
        fr_page_plus = (ImageView) view.findViewById(R.id.fr_page_plus);
        fr_page_sure = (Button) view.findViewById(R.id.fr_page_sure);
        describe = (TextView) view.findViewById(R.id.describe);

        xing = (ImageView) view.findViewById(R.id.xing);
        xing.setOnClickListener(this);

        fr_page_cuts.setOnClickListener(this);
        fr_page_num.setOnClickListener(this);
        fr_page_plus.setOnClickListener(this);
        fr_page_sure.setOnClickListener(this);
    }

    private void showPopouWindo(int position) {
        mPosition = position;
        if (list.get(position).isShouCang()) {
            xing.setBackgroundResource(R.drawable.rc_ic_star_hover);
        } else {
            xing.setBackgroundResource(R.drawable.rc_ic_star);
        }
        this.positionCount = position;
        fr_page_amounts.setText(list.get(position).getPrice());
        fr_page_bag.setText(list.get(position).getName());
        describe.setText(list.get(position).getType() + " " +
                list.get(position).getType2() + " ");

        Glide
                .with(this)
                .load(list.get(position).getImg())
                .into(fr_page_picture);
    }


    private Boolean isRepeatData() {
        String name = (String) fr_page_bag.getText();
        for (int i = 0; i < MyApplication.washJavas.size(); i++) {
            goodsModel = MyApplication.washJavas.get(i);
            if (name.equals(goodsModel.getName())) {
                return true;
            }
        }
        return false;
    }

    @Override public void onClick(View v) {
        switch (v.getId()) {
            case R.id.fr_page_cuts:
                String jian = (String) fr_page_num.getText();
                int sum = Integer.parseInt(jian);
                if (sum > i) {
                    fr_page_num.setText(sum - 1 + "");
                }
                break;
            case R.id.fr_page_num:
                break;
            case R.id.fr_page_plus:
                String jia = (String) fr_page_num.getText();
                sum = Integer.parseInt(jia);
                if (sum >= i) {
                    fr_page_num.setText(sum + 1 + "");
                }
                break;
            case R.id.fr_page_sure:

                if (null != window && window.isShowing()) {
                    Boolean isRepeat = isRepeatData();
                    String name = (String) fr_page_bag.getText();
                    if (isRepeat) {
                        for (int wash = 0; wash < MyApplication.washJavas.size(); wash++) {
                            goodsModel = MyApplication.washJavas.get(positionCount);
                            if (name.equals(goodsModel.getName())) {
                                String str1 = goodsModel.getCount();
                                int a1 = Integer.parseInt(str1);
                                String str2 = (String) fr_page_num.getText();
                                int a2 = Integer.parseInt(str2);
                                goodsModel.setCount((a1 + a2) + "");
                                break;
                            }
                        }
                    } else {
                        list.get(positionCount).setCount(fr_page_num.getText().toString());
                        MyApplication.washJavas.add(list.get(positionCount));
                    }
                    Toast.makeText(SearchActivity.this, "加入到购物车成功", Toast.LENGTH_SHORT).show();
                    fr_page_num.setText("1");
                    window.dismiss();
                }
                break;

            case R.id.xing:
                String type = "";
                if (list.get(mPosition).isShouCang()) {
                    xing.setBackgroundResource(R.drawable.rc_ic_star);
                    type = "0";
                    list.get(positionCount).setShouCang(false);


                } else {
                    xing.setBackgroundResource(R.drawable.rc_ic_star_hover);
                    type = "1";
                    list.get(positionCount).setShouCang(true);

                }


                SharedPreferences pref = getSharedPreferences("user", MODE_PRIVATE);
                String user_id = pref.getString("phone", "null");
                OkHttpUtils
                        .get()
                        .url(MyApplication.url + "shoucang")
                        .addParams("user_phone", user_id)
                        .addParams("product_id", list.get(mPosition).getId())
                        .addParams("shoucang", type)

                        .build()
                        .execute(new StringCallback() {
                            @Override
                            public void onError(Request request, Exception e) {

                            }
                            @Override
                            public void onResponse(String response) {
                            }

                        });
                break;
        }
    }
}
