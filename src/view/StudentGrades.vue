<template>
    <div class=".affix-container">
      <h5>学生成绩信息: </h5>
      <el-table :data="grades.slice((currentPage-1)*pageSize,currentPage*pageSize)" :height="tableHeight">
        <el-table-column prop="s_id" label="Id"/>
        <el-table-column prop="s_name" label="Name"/>
        <el-table-column prop="subject" label="Subject" />
        <el-table-column prop="score" label="Score" />
        <el-table-column prop="invigilator" label="Invigilator" />
        <el-table-column prop="papers_examiner" label="PapersExaminer" />
        <el-table-column prop="classroom_no" label="ClassroomNo" />
        <el-table-column prop="test_time" label="Timing" />
        <el-table-column prop="extra_info" label="ExtraInfo" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="searchText" size="small" placeholder="Type to search" clearable
                      @change="search" @input="afterChange"
            />
          </template>
          <template #default="scope">
            <el-button size="small"
              >Edit</el-button>
            <el-button
              size="small"
              type="danger"
            >Delete</el-button>
          </template>
      </el-table-column>
      </el-table>
      <el-affix>
        <el-pagination v-model:page-size="pageSize"
                       v-model:current-page="currentPage"
                       :total="totalNum"
                       :current-page="currentPage"
                       layout="prev, pager, next ,jumper"></el-pagination>
      </el-affix>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableHeight: window.innerHeight - 300,
        grades: [],
        currentPage: 1,
        pageSize: 6,
        searchText: '',
        }
      },
    methods: {
      afterChange() {
        if (!this.searchText) {
          this.getAll();
        }
      },
      getAll() {
        let req = axios.get('http://localhost:9999');
        req.then(response => {
          console.log(response.data.data)
          this.grades = response.data.data;
        })
        console.log('getAll ...')
      },
      search() {
        if (!this.searchText) {
          //alert('请输入搜索内容');
          return;
        }
        this.grades = [];
        const req = indexedDB.open('School', 1);
        req.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction('grade');
          const store = transaction.objectStore('grade');
          const request = store.openCursor();
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              const data = cursor.value;
              for (const value of Object.values(data)) {
                if (value == this.searchText) {
                  this.grades.push(data);
                }
              }
              cursor.continue();
            }
          }
        }
        req.onerror = (event) => {
          indexedDB.deleteDatabase('School');
          alert('数据库打开失败');
        }
      }
    },
    computed: {
      totalNum() {
        return this.grades.length;
      },
    },
    created() {
      this.getAll();
    }
  } 
</script>
