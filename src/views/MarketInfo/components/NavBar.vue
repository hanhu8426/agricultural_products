<script setup>
import { ref } from 'vue'
const activeName = ref('first')
</script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" >
        <el-tab-pane label="单一品种全国平均价" name="first" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种地区平均价" name="second" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一市场多品种对比" name="third" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多市场对比" name="forth" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多地区对比" name="fifth" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style lang="scss">
.el-tabs__item {
    padding: 0 40px;
    height: var(--el-tabs-header-height);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: var(--el-font-size-base);
    font-weight: bold;
    color: var(--el-text-color-primary);
    position: relative;
    width: auto;
}
</style>