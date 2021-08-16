import shortMarkUp from '../../templates/pagination/shortPagination.hbs';
import startMarkUp from '../../templates/pagination/startPagination.hbs';
import endMarkUp from '../../templates/pagination/endPagination.hbs';
import standardMarkUp from '../../templates/pagination/standardPagination.hbs';


export default class BlockOfPages {
    constructor() {
        this.pageBlock = document.querySelector('.pagination');
        this.changes = 0;
        this.pageList = [];
        this.markUp = '';
        this.currentPage = {};
        this.previousPage = {};
        this.currentNumber = 1;
        this.lastNumber = 7;


    }


    updatePageList(start = 1, last = this.lastNumber) {
        this.pageList = [];
        for (let i = start; i <= last; i += 1) {
            this.pageList.push(i);
        }
    }

    updateCurrentPage(newPage) {
        if (this.changes > 0) {
            this.previousPage = this.currentPage;
            this.previousPage.classList.remove('current');
        }
        this.changes += 1;
        this.currentPage = newPage;
        this.currentPage.classList.add("current");

    }
    findCurrentPage(targetNumber, newPageList) {
        newPageList.forEach(item => {
            if (item.textContent == targetNumber) {
                this.updateCurrentPage(item);
            }
        })
        this.updateCurrentNumber(targetNumber);
    }
    updateCurrentNumber(newNumber) {
        this.currentNumber = newNumber;
    }

    updateLastPage(page) {
        this.lastNumber = page;
    }

    updateMarkUp(markUpType, needLastPage) {
        if (needLastPage) {
            this.markUp = markUpType({ pageList: this.pageList, lastPage: this.lastNumber })
        } else {
            this.markUp = markUpType([...this.pageList]);
        }
    }


    createPaginationBlock() {
        if (this.lastNumber < 8) {
            this.updatePageList();
            this.updateMarkUp(shortMarkUp, false);
            console.log(this.markUp);

        } else {
            this.updatePageList(1, 5);
            this.updateMarkUp(startMarkUp, true);
        }

        this.setPaginationBlock();
        const startPage = document.querySelector('.page-button');
        this.updateCurrentPage(startPage);

    }
    clearPagination() {
        this.pageBlock.innerHTML = '';
    }

    setPaginationBlock() {
        this.pageBlock.insertAdjacentHTML('beforeend', this.markUp);
    }

    updatePagination() {
        this.clearPagination();
        this.setPaginationBlock();

    }





};