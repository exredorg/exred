set nocompatible   
filetype off



" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'gmarik/Vundle.vim'

" Code/project navigation
Plugin 'scrooloose/nerdtree' 
Plugin 'majutsushi/tagbar'  

" others
Plugin 'vim-airline/vim-airline' 
Plugin 'vim-airline/vim-airline-themes' 
Plugin 'fisadev/FixedTaskList.vim'  	" Pending tasks list
Plugin 'rosenfeld/conque-term'      	" Consoles as buffers
Plugin 'tpope/vim-surround'	   	" Parentheses, brackets, quotes, XML tags, and more
Plugin 'ctags.vim'

" language support
Plugin 'elixir-lang/vim-elixir'

call vundle#end()            " required



filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on


" Put your non-Plugin stuff after this line

syntax on
set ruler

" autocmd vimenter * TagbarToggle
" autocmd vimenter * NERDTree
" autocmd vimenter * if !argc() | NERDTree | endif

colorscheme desert

set nu
set nobackup
set smarttab
set tabstop=2
set expandtab

set laststatus=2
let g:airline_theme='badwolf'
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#formatter = 'unique_tail'

let mapleader='='
nmap <leader>t :TagbarToggle<CR>
let g:tagbar_autofocus = 0

nmap <leader>o :NERDTreeToggle<CR>

nmap <leader>l :TaskList<CR>
