export default function(){
  this.transition(
    this.hasClass('tab-animation'),
    this.toValue(function(to, from){
      return to.tab > from.tab;
    }),
    this.use('toLeft')
  );
  this.transition(
    this.hasClass('tab-animation'),
    this.toValue(function(to, from){
      return to.tab < from.tab;
    }),
    this.use('toRight')
  );
}
