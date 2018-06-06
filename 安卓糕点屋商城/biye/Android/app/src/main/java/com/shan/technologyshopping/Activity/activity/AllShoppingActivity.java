package com.shan.technologyshopping.Activity.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.shan.technologyshopping.Activity.adapter.WashAdapter;
import com.shan.technologyshopping.Activity.fragment.FragmentDangao;
import com.shan.technologyshopping.Activity.fragment.FragmentBinggan;
import com.shan.technologyshopping.Activity.fragment.FragmentMianbao;
import com.shan.technologyshopping.R;

import java.util.ArrayList;

/**
 * 所有商品的界面
 */
public class AllShoppingActivity extends AppCompatActivity {

    private TextView fragment_wash_spring;
    private TextView fragment_wash_summer;
    private TextView fragment_wash_winter;
    private TextView fragment_wash_coat;
    private TextView cursor;
    private ImageView wash_back;
    private ViewPager fragment_wash_pager;
    private ArrayList<Fragment> fragmentList;
    private int currIndex;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_all_fenlei);
        initTextView();
        InitTextBar();
        InitViewPager();
        Intent intent = getIntent();
        String type = intent.getExtras().getString("type");
        switch (type) {
            case "1":
                fragment_wash_pager.setCurrentItem(0);
                break;

            case "2":
                fragment_wash_pager.setCurrentItem(1);
                break;

            case "3":
                fragment_wash_pager.setCurrentItem(2);
                break;


        }
    }

    /**
     * 初始化+点击监听
     *
     * @param
     */
    private void initTextView() {
        fragment_wash_spring = (TextView) findViewById(R.id.fragment_wash_spring);
        fragment_wash_summer = (TextView) findViewById(R.id.fragment_wash_summer);
        fragment_wash_winter = (TextView) findViewById(R.id.fragment_wash_winter);
        wash_back = (ImageView) findViewById(R.id.wash_back);
        wash_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        fragment_wash_spring.setOnClickListener(new txListener(0));
        fragment_wash_summer.setOnClickListener(new txListener(1));
        fragment_wash_winter.setOnClickListener(new txListener(2));

    }

    private class txListener implements View.OnClickListener {
        private int index = 0;

        public txListener(int i) {
            index = i;
        }

        @Override
        public void onClick(View v) {
            fragment_wash_pager.setCurrentItem(index);
        }
    }

    /**
     * 动态计算横线的textview的宽度并
     *
     * @param
     */
    private void InitTextBar() {
        cursor = (TextView) super.findViewById(R.id.cursor);
        Display display = getWindow().getWindowManager().getDefaultDisplay();
        // 得到显示屏宽度
        DisplayMetrics metrics = new DisplayMetrics();
        display.getMetrics(metrics);
        // 1/3屏幕宽度
        int tabLineLength = metrics.widthPixels / 3;
        LinearLayout.LayoutParams lp = (LinearLayout.LayoutParams) cursor.getLayoutParams();
        lp.width = tabLineLength;
        cursor.setLayoutParams(lp);
    }

    /**
     * viewpager滑动时改变textview显示的颜色
     *
     * @param
     */
    private void InitViewPager() {
        fragment_wash_pager = (ViewPager) findViewById(R.id.fragment_wash_pager);
        fragmentList = new ArrayList<Fragment>();
        FragmentDangao cloths = new FragmentDangao();
        FragmentMianbao trousers = new FragmentMianbao();
        FragmentBinggan shoses = new FragmentBinggan();
        fragmentList.add(cloths);
        fragmentList.add(trousers);
        fragmentList.add(shoses);
        fragment_wash_pager.setAdapter(new WashAdapter(getSupportFragmentManager(), fragmentList));
        fragment_wash_pager.setCurrentItem(0);//设置当前显示标签页为第一页
        fragment_wash_pager.setOnPageChangeListener(new MyOnPageChangeListener());
    }

    public class MyOnPageChangeListener implements ViewPager.OnPageChangeListener {
        @Override
        public void onPageScrolled(int arg0, float arg1, int arg2) {
            // TODO Auto-generated method stub
            // 取得该控件的实例
            LinearLayout.LayoutParams ll = (android.widget.LinearLayout.LayoutParams) cursor
                    .getLayoutParams();

            if (currIndex == arg0) {
                ll.leftMargin = (int) (currIndex * cursor.getWidth() + arg1
                        * cursor.getWidth());
            } else if (currIndex > arg0) {
                ll.leftMargin = (int) (currIndex * cursor.getWidth() - (1 - arg1) * cursor.getWidth());
            }
            cursor.setLayoutParams(ll);
        }

        @Override
        public void onPageScrollStateChanged(int arg0) {
            // TODO Auto-generated method stub
        }

        @Override
        public void onPageSelected(int arg0) {
            // TODO Auto-generated method stub
            currIndex = arg0;
            setColor(arg0);
            int i = currIndex + 1;
        }
    }

    /**
     * 设置颜色的方法
     *
     * @param
     */
    private void setColor(int i) {
        if (i == 0) {
            fragment_wash_spring.setTextColor(getResources().getColor(R.color.bg_main_blue));
            fragment_wash_summer.setTextColor(getResources().getColor(R.color.bg_image_grey));
            fragment_wash_winter.setTextColor(getResources().getColor(R.color.bg_image_grey));
        } else if (i == 1) {
            fragment_wash_spring.setTextColor(getResources().getColor(R.color.bg_image_grey));
            fragment_wash_summer.setTextColor(getResources().getColor(R.color.bg_main_blue));
            fragment_wash_winter.setTextColor(getResources().getColor(R.color.bg_image_grey));
        } else if (i == 2) {
            fragment_wash_spring.setTextColor(getResources().getColor(R.color.bg_image_grey));
            fragment_wash_summer.setTextColor(getResources().getColor(R.color.bg_image_grey));
            fragment_wash_winter.setTextColor(getResources().getColor(R.color.bg_main_blue));
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //GetDataByVolley.cancelRequest("33");
    }
}
