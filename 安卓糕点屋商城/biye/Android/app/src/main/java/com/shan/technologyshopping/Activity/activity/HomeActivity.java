package com.shan.technologyshopping.Activity.activity;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.shan.technologyshopping.Activity.homefragment.FragmentShoppingCar;
import com.shan.technologyshopping.Activity.homefragment.FragmentMe;
import com.shan.technologyshopping.Activity.homefragment.FragmentPage;
import com.shan.technologyshopping.R;

import java.util.ArrayList;
import java.util.List;

/**
 * 主界面
 */
public class HomeActivity extends AppCompatActivity {

    private ViewPager vpMain;
    private RadioGroup rgMainTab;
    private List<Fragment> fragmentList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //隐藏标题栏
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_mian);
        initView();
    }

    private void initView() {
        vpMain = (ViewPager) findViewById(R.id.vp_main);
        rgMainTab = (RadioGroup) findViewById(R.id.rg_main_tab);
        fragmentList = new ArrayList<>();
        FragmentPage page = new FragmentPage();
        FragmentShoppingCar laundry = new FragmentShoppingCar();
        FragmentMe me = new FragmentMe();
        //FragmentMore more = new FragmentMore();
        fragmentList.add(page);
        fragmentList.add(laundry);
        fragmentList.add(me);
        //fragmentList.add(more);
        //vpMain.setCurrentItem(3);
        vpMain.setAdapter(new MainFragmentAdapter(getSupportFragmentManager()));
        vpMain.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int position) {
                //滑动页面改变后刷新选项卡界面
                ((RadioButton) rgMainTab.getChildAt(position)).setChecked(true);
            }

            @Override
            public void onPageScrollStateChanged(int state) {
            }
        });
        rgMainTab.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                int position = 0;
                switch (checkedId) {
                    case R.id.rb_main_home:
                        position = 0;
                        break;
                    case R.id.rb_main_basket:
                        position = 1;
                        break;
                    case R.id.rb_main_my:
                        position = 2;
                        break;
//                    case R.id.rb_main_more:
//                        position = 3;
//                        break;
                }
                //radioButton 点击后改变界面
                vpMain.setCurrentItem(position);
            }
        });
    }

    class MainFragmentAdapter extends FragmentPagerAdapter {
        public MainFragmentAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return fragmentList.get(position);
        }

        @Override
        public int getCount() {
            return fragmentList.size();
        }
    }
}
