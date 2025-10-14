<template>
  <div class="wrapper">
    <MenuView />
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box">
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Transaksi </a></li>
                    <li class="breadcrumb-item active">Data Transaksi</li>
                  </ol>
                </div>
                <h4 class="page-title color-black">Data Transaksi</h4>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <table
                    id="basic-datatable"
                    class="table table-striped dt-responsive nowrap w-100"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </thead>

                    <tbody></tbody>
                  </table>
                </div>
                <!-- end card body-->
              </div>
              <!-- end card -->
            </div>
            <!-- end col-->
          </div>
          <FooterView />
        </div>
      </div>
    </div>
  </div>
  <RightSidebarView />
</template>
<script setup>
import MenuView from '@/components/layouts/MenuView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import RightSidebarView from '@/components/layouts/RightSidebarView.vue'
</script>
