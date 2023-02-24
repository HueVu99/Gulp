//Mô-đun chính
import gulp from "gulp";
import { path } from "./gulp/config/path.js";
//Truyền giá trị cho một biến toàn cục
global.app = {
    path: path,
    gulp: gulp
}
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js"
//Change Watcher In Files
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
}
//gulp.parallelsẽ trả về một hàm chạy song song từng tác vụ / chức năng đã cho. Cuối cùng, Gulp đã cho chúng ta khả năng lựa chọn giữa thực thi các nhiệm vụ tuần tự và song song mà không cần sự phụ thuộc khác ( chuỗi truyền thống ) hoặc một loạt các sắp xếp phụ thuộc nhiệm vụ điên rồ.

const mainTasks = gulp.parallel(copy, html);
//Xây dựng kịch bản thực hiện nhiệm vụ
//gulp.series, nó sẽ trả về một hàm chạy từng nhiệm vụ / hàm đã cho theo thứ tự mà chúng được cung cấp
const dev = gulp.series(reset, mainTasks, watcher);
gulp.task('default', dev);