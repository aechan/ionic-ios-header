var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Platform, IonContent } from '@ionic/angular';
var HTML_TEMPLATE = "\n<ion-header style=\"box-shadow: none;\" class=\"statusbar\" #nav>\n  <ion-toolbar>\n    <ng-container *ngTemplateOutlet=\"navbarStart\"></ng-container>\n    <ion-title><span #fade>{{title}}</span></ion-title>\n    <ng-container *ngTemplateOutlet=\"navbarEnd\"></ng-container>\n  </ion-toolbar>\n  <ng-container *ngTemplateOutlet=\"headerEnd\"></ng-container>\n</ion-header>\n\n<ion-content fullscreen no-bounce>\n  <div #toolbar>\n    <h1 #header class=\"bold-header\">{{title}}</h1>\n    <ion-toolbar [hidden]=\"!search\" #searchbar>\n        <ion-searchbar\n        [(ngModel)]=\"query\"\n        (ionInput)=\"queryChange.emit(query)\">\n      </ion-searchbar>\n    </ion-toolbar>\n  </div>\n  <ng-content></ng-content>\n</ion-content>\n";
var HeaderContentComponent = /** @class */ (function () {
    function HeaderContentComponent(renderer, platform) {
        this.renderer = renderer;
        this.platform = platform;
        this.search = false;
        this.forceIOS = false;
        this.queryChange = new EventEmitter();
        this.domChange = new EventEmitter();
        //Utils
        this.ios = false;
        this.state = false;
    }
    //Life cycle
    HeaderContentComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.content.getScrollElement().then(function (scroll) { return _this.scrollContent = scroll; });
        this.platform.ready().then(function () {
            _this.ios = _this.platform.is('ios') || _this.forceIOS;
            if (_this.ios)
                _this.initIOS();
            else
                _this.initAndroid();
        });
    };
    HeaderContentComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    //Sub Management
    HeaderContentComponent.prototype.unsubscribe = function () {
        if (this.subscriptionScroll)
            this.subscriptionScroll.unsubscribe();
        if (this.changes)
            this.changes.disconnect();
    };
    HeaderContentComponent.prototype.subscribe = function () {
        var _this = this;
        this.contentChange();
        this.subscriptionScroll = this.content.ionScroll
            .subscribe(function (data) {
            console.log(data);
            if (!_this.state && data.scrollTop >= _this.element.nativeElement.offsetHeight - 5) {
                _this.state = true;
                _this.transitionToHeader();
            }
            if (_this.state && data.scrollTop < _this.element.nativeElement.offsetHeight) {
                _this.state = false;
                _this.transitionToBody();
            }
        });
    };
    //Subscription logic
    HeaderContentComponent.prototype.contentChange = function () {
        var _this = this;
        if (this.contentbox) {
            this.changes = new MutationObserver(function (mutations) {
                if (_this.contentbox.clientHeight < _this.scrollContent.scrollHeight)
                    _this.transitionToBody();
            });
            this.changes.observe(this.contentbox, {
                attributes: true,
                childList: true,
                characterData: true
            });
        }
    };
    HeaderContentComponent.prototype.initIOS = function () {
        this.contentChange();
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 1s linear');
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
        this.appear = new EventEmitter();
        var height = this.toolbar.nativeElement.clientHeight; //USE RULER
        var styleheight = height + 'px';
        this.renderer.setStyle(this.toolbar.nativeElement, 'min-height', styleheight);
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.fade.nativeElement, 'transition', 'opacity 0.155s linear');
        this.subscribe();
    };
    HeaderContentComponent.prototype.initAndroid = function () {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav.nativeElement, this.searchbar.nativeElement);
    };
    HeaderContentComponent.prototype.transitionToHeader = function () {
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav.nativeElement, this.searchbar.nativeElement);
    };
    HeaderContentComponent.prototype.transitionToBody = function () {
        if (this.searchbar)
            this.renderer.appendChild(this.toolbar.nativeElement, this.searchbar.nativeElement);
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
    };
    //Extra
    HeaderContentComponent.prototype.debug = function () {
        console.log('content', JSON.stringify(this.contentbox));
        console.log('element:', this.element);
        console.log('toolbar:', this.toolbar);
        console.log('fade:', this.fade);
        console.log('searchbar', this.searchbar);
        console.log('nav', this.nav);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HeaderContentComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderContentComponent.prototype, "search", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HeaderContentComponent.prototype, "forceIOS", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], HeaderContentComponent.prototype, "contentbox", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HeaderContentComponent.prototype, "query", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], HeaderContentComponent.prototype, "queryChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], HeaderContentComponent.prototype, "navbarStart", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], HeaderContentComponent.prototype, "navbarEnd", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], HeaderContentComponent.prototype, "headerEnd", void 0);
    __decorate([
        ViewChild('searchbar'),
        __metadata("design:type", ElementRef)
    ], HeaderContentComponent.prototype, "searchbar", void 0);
    __decorate([
        ViewChild('toolbar'),
        __metadata("design:type", ElementRef)
    ], HeaderContentComponent.prototype, "toolbar", void 0);
    __decorate([
        ViewChild('nav'),
        __metadata("design:type", ElementRef)
    ], HeaderContentComponent.prototype, "nav", void 0);
    __decorate([
        ViewChild('fade'),
        __metadata("design:type", ElementRef)
    ], HeaderContentComponent.prototype, "fade", void 0);
    __decorate([
        ViewChild('header'),
        __metadata("design:type", ElementRef)
    ], HeaderContentComponent.prototype, "element", void 0);
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], HeaderContentComponent.prototype, "content", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HeaderContentComponent.prototype, "domChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], HeaderContentComponent.prototype, "appear", void 0);
    HeaderContentComponent = __decorate([
        Component({
            selector: 'header-content',
            template: HTML_TEMPLATE,
            styles: ['.bold-header { padding-top: 0px;margin: 0;padding-left: 15px;padding-bottom: 0px;font-size: 2.7em;font-weight: bolder;color: #111}',
                '.statusbar{padding-top: calc(20px);padding-top: calc(constant(safe-area-inset-top) + 4px);padding-top: calc(env(safe-area-inset-top));min-height: calc(44px + 20px);min-height: calc(44px + constant(safe-area-inset-top));min-height: calc(44px + env(safe-area-inset-top)); }']
        }),
        __metadata("design:paramtypes", [Renderer2, Platform])
    ], HeaderContentComponent);
    return HeaderContentComponent;
}());
export { HeaderContentComponent };
//# sourceMappingURL=header-content.js.map