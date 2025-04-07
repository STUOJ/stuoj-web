<template>
  <div class="toolbar">
    <div class="toolbar-section">
      <ElTooltip content="增大一级" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="increaseFontSize">
          <strong>H+</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="减小一级" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="decreaseFontSize">
          <strong>H-</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="加粗" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleBold">
          <strong>
            B
          </strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="斜体" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleItalic">
          <i>I</i>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="上标" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleSuperscript">
          <strong>T</strong><sup>S</sup>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="下标" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleSubscript">
          <strong>T</strong><sub><i>S</i></sub>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="下划线" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleUnderline">
          <u>U</u>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="删除线" placement="top">
        <ElButton class="toolbar-button" text size="default" @mousedown.prevent="toggleStrikethrough">
          <s>S</s>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="引用" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleQuote">
          <strong>“</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="有序列表" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleOrderedList">
          <strong>1. #</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="无序列表" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleUnorderedList">
          <strong>- #</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="代码块" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleCodeBlock">
          <strong>>_</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="插入表格" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="showTableDialog">
          <strong>|</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="数学公式" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleMath">
          <strong>∑</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="水平线" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleHorizontalRule">
          <strong>- - -</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="脚注" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleFootnote">
          <strong>F</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="高亮" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="toggleHighlight">
          <strong>H</strong>
        </ElButton>
      </ElTooltip>
    </div>
    <div class="toolbar-divider" />
    <div class="toolbar-section">
      <ElTooltip content="插入链接" placement="top">
        <ElButton class="toolbar-button" text size="default" :icon="Link" @click="insertLink" />
      </ElTooltip>
      <ElTooltip content="插入图片链接" placement="top">
        <ElButton class="toolbar-button" text size="default" :icon="PictureFilled" @click="insertImageLink" />
      </ElTooltip>
      <ElTooltip content="插入图片" placement="top">
        <ElButton class="toolbar-button" text size="default" :icon="Picture" @click="selectImage" />
      </ElTooltip>
    </div>
    <div class="toolbar-divider" />
    <div class="toolbar-section right-aligned">
      <ElTooltip content="帮助手册" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="help">
          <strong>?</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="撤回" placement="top">
        <ElButton class="toolbar-button" text size="default" @click="undo">
          <strong>↩</strong>
        </ElButton>
      </ElTooltip>
      <ElTooltip content="编辑区" placement="top">
        <ElButton text class="toolbar-button" :class="{ 'selected': checkboxGroup.includes('editorShow') }"
          @click="toggleCheckbox('editorShow')" :icon="Edit" />
      </ElTooltip>
      <ElTooltip content="预览区" placement="top">
        <ElButton text class="toolbar-button" :class="{ 'selected': checkboxGroup.includes('previewShow') }"
          @click="toggleCheckbox('previewShow')" :icon="Tickets" />
      </ElTooltip>
    </div>
  </div>
  <div class="text-editor">
    <ElInput v-model="text" type="textarea" :placeholder="placeholder"
      :autosize="{ minRows: minRow }" resize="none" class="editor" inputStyle="border: none;"
      @keydown.enter="handleEnterKey" @keydown="handleKeyDown" />
    <TextView v-show="previewShow" v-model:content="text" :fontSize="fontSize" :letterSpacing="letterSpacing"
      :lineHeight="lineHeight" class="preview" />
  </div>
  <ElDialog v-model="dialogVisible" title="插入图片链接">
    <ElForm>
      <ElFormItem label="图片名称">
        <ElInput v-model="imageName" class="form-item-input" />
      </ElFormItem>
      <ElFormItem label="图片链接">
        <ElInput v-model="imageUrl" class="form-item-input" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="dialogVisible = false">取消</ElButton>
      <ElButton type="primary" @click="confirmInsertImageLink">确定</ElButton>
    </template>
  </ElDialog>
  <ElDialog v-model="linkDialogVisible" title="插入链接">
    <ElForm>
      <ElFormItem label="链接文本">
        <ElInput v-model="linkText" class="form-item-input" />
      </ElFormItem>
      <ElFormItem label="链接地址">
        <ElInput v-model="linkUrl" class="form-item-input" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="linkDialogVisible = false">取消</ElButton>
      <ElButton type="primary" @click="confirmInsertLink">确定</ElButton>
    </template>
  </ElDialog>
  <ElDialog v-model="tableDialogVisible" title="插入表格">
    <ElForm>
      <ElFormItem label="行数">
        <ElInput v-model.number="tableRows" class="form-item-input" type="number" min="1" />
      </ElFormItem>
      <ElFormItem label="列数">
        <ElInput v-model.number="tableColumns" class="form-item-input" type="number" min="1" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="tableDialogVisible = false">取消</ElButton>
      <ElButton type="primary" @click="insertTable">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, watchEffect } from 'vue';
import type { Album } from '@/types/misc';
import { uploadImageApi } from '@/apis/image';
import { Edit, Picture, Tickets, PictureFilled, Link } from '@element-plus/icons-vue';
import { ElTooltip, ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElNotification } from 'element-plus';


const { execute } = uploadImageApi();

const props = withDefaults(defineProps<{
  text: string;
  album: Album;
  placeholder?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  minRow?: number;
  maxRow?: number;
}>(), {
  placeholder: '',
  fontSize: '16px',
  letterSpacing: 'normal',
  lineHeight: 'normal',
  minRow: 10,
  maxRow: 20,
});

const editorShow = ref(true);
const previewShow = ref(true);
const text = ref(props.text);

const emit = defineEmits(['update:text']);

const checkboxGroup = ref<string[]>(['editorShow', 'previewShow']);

const dialogVisible = ref(false);
const imageName = ref('');
const imageUrl = ref('');

const linkDialogVisible = ref(false);
const linkText = ref('');
const linkUrl = ref('');

const history = ref<string[]>([]);
const historyIndex = ref(-1);

const saveHistory = () => {
  if (historyIndex.value < history.value.length - 1) {
    history.value.splice(historyIndex.value + 1);
  }
  history.value.push(text.value);
  historyIndex.value++;
};

const help = () => {
  window.open("https://jf.stuoj.com/blog/28", "_blank");
}

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--;
    text.value = history.value[historyIndex.value];
  }
};

const toggleCheckbox = (checkbox: string) => {
  const index = checkboxGroup.value.indexOf(checkbox);
  if (index === -1) {
    checkboxGroup.value.push(checkbox);
  } else {
    checkboxGroup.value.splice(index, 1);
  }
  if (checkbox === 'editorShow') {
    editorShow.value = !editorShow.value;
  } else if (checkbox === 'previewShow') {
    previewShow.value = !previewShow.value;
  }
};

const insertImageLink = () => {
  dialogVisible.value = true;
};

const confirmInsertImageLink = () => {
  if (imageUrl.value) {
    text.value += `![${imageName.value}](${imageUrl.value})`;
  }
  dialogVisible.value = false;
  imageName.value = '';
  imageUrl.value = '';
};

const insertLink = () => {
  linkDialogVisible.value = true;
};

const confirmInsertLink = () => {
  if (linkUrl.value) {
    text.value += `[${linkText.value}](${linkUrl.value})`;
  }
  linkDialogVisible.value = false;
  linkText.value = '';
  linkUrl.value = '';
};

const selectImage = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const fileName = file.name;
      text.value += `![${fileName}](${imageUrl})`;
    }
  };
  input.click();
};

const handleEnterKey = (event: Event | KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const beforeCursor = value.substring(0, start);
  const afterCursor = value.substring(end);
  const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
  const currentLine = beforeCursor.substring(currentLineStart);
  let newText = '\n';
  if (currentLine.trim().startsWith('- ')) {
    newText = '\n- ';
  } else if (/^\d+\.\s/.test(currentLine.trim())) {
    const match = currentLine.trim().match(/^(\d+)\.\s/);
    if (match) {
      const number = parseInt(match[1], 10) + 1;
      newText = `\n${number}. `;
    }
  }
  textarea.value = beforeCursor + newText + afterCursor;
  textarea.selectionStart = textarea.selectionEnd = start + newText.length;
  event.preventDefault();
  text.value = textarea.value;
};

const toggleBold = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const boldText = `**${selectedText}**`;
  textarea.setRangeText(boldText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
  textarea.focus();
};

const toggleSuperscript = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const boldText = `^${selectedText}^`;
  textarea.setRangeText(boldText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
  textarea.focus();
};

const toggleSubscript = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const boldText = `~${selectedText}~`;
  textarea.setRangeText(boldText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
  textarea.focus();
}

const toggleItalic = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const italicText = `*${selectedText}*`;
  textarea.setRangeText(italicText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
  textarea.focus();
};

const toggleUnderline = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const underlineText = `++${selectedText}++`;
  textarea.setRangeText(underlineText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
  textarea.focus();
};

const toggleStrikethrough = (event: MouseEvent) => {
  event.preventDefault();
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const strikethroughText = `~~${selectedText}~~`;
  textarea.setRangeText(strikethroughText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
  textarea.focus();
};

const toggleQuote = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const beforeCursor = value.substring(0, start);
  const afterCursor = value.substring(end);
  const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
  const currentLine = beforeCursor.substring(currentLineStart);

  const quoteText = `>${currentLine.replace(/\n/g, '\n> ')}`;
  textarea.value = beforeCursor.substring(0, currentLineStart) + quoteText + afterCursor;
  textarea.selectionStart = textarea.selectionEnd = start + 1;
  text.value = textarea.value;
  textarea.focus();
};

const toggleOrderedList = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const orderedListText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
  textarea.setRangeText(orderedListText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 3, start + 3 + orderedListText.length);
  textarea.focus();
};

const toggleUnorderedList = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const unorderedListText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
  textarea.setRangeText(unorderedListText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + unorderedListText.length);
  textarea.focus();
};

const toggleCodeBlock = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const codeBlockText = `\`\`\`\n${selectedText}\n\`\`\``;
  textarea.setRangeText(codeBlockText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 4, start + 4 + selectedText.length);
  textarea.focus();
};

const tableDialogVisible = ref(false);
const tableRows = ref(1);
const tableColumns = ref(1);

const showTableDialog = () => {
  tableDialogVisible.value = true;
};

const insertTable = () => {
  const rows = tableRows.value;
  const columns = tableColumns.value;

  let tableMarkdown = '|';
  for (let i = 0; i < columns; i++) {
    tableMarkdown += '     ' + '|';
  }
  tableMarkdown += '\n|';
  for (let i = 0; i < columns; i++) {
    tableMarkdown += ' --- |';
  }
  tableMarkdown += '\n';
  for (let i = 0; i < rows - 1; i++) {
    tableMarkdown += '|';
    for (let j = 0; j < columns; j++) {
      tableMarkdown += '     |';
    }
    tableMarkdown += '\n';
  }

  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.setRangeText(tableMarkdown, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + tableMarkdown.length, start + tableMarkdown.length);
  textarea.focus();

  tableDialogVisible.value = false;
  tableRows.value = 1;
  tableColumns.value = 1;
};


const toggleMath = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const mathText = `$${selectedText}$`;
  textarea.setRangeText(mathText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 1, start + 1 + selectedText.length);
  textarea.focus();
};

const increaseFontSize = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const beforeCursor = value.substring(0, start);
  const afterCursor = value.substring(end);
  const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
  const currentLineEnd = value.indexOf('\n', start);
  const currentLine = value.substring(currentLineStart, currentLineEnd === -1 ? value.length : currentLineEnd);

  let newLine = currentLine;
  if (/^#{1,6} /.test(currentLine)) {
    const match = currentLine.match(/^(#{1,6}) /);
    if (match) {
      const hashes = match[1].length;
      if (hashes > 1) {
        newLine = `${'#'.repeat(hashes - 1)} ${currentLine.substring(hashes + 1).trim()}`;
      }
    }
  } else {
    newLine = `###### ${currentLine.trim()}`;
  }

  textarea.value = beforeCursor.substring(0, currentLineStart) + newLine + afterCursor.substring(currentLineEnd === -1 ? value.length : currentLineEnd);
  textarea.selectionStart = textarea.selectionEnd = start + (newLine.length - currentLine.length);
  text.value = textarea.value;
  textarea.focus();
};

const decreaseFontSize = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const beforeCursor = value.substring(0, start);
  const afterCursor = value.substring(end);
  const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
  const currentLineEnd = value.indexOf('\n', start);
  const currentLine = value.substring(currentLineStart, currentLineEnd === -1 ? value.length : currentLineEnd);

  let newLine = currentLine;
  if (/^#{1,6} /.test(currentLine)) {
    const match = currentLine.match(/^(#{1,6}) /);
    if (match) {
      const hashes = match[1].length;
      if (hashes < 6) {
        newLine = `${'#'.repeat(hashes + 1)} ${currentLine.substring(hashes + 1).trim()}`;
      } else {
        newLine = currentLine.substring(hashes + 1).trim();
      }
    }
  }

  textarea.value = beforeCursor.substring(0, currentLineStart) + newLine + afterCursor.substring(currentLineEnd === -1 ? value.length : currentLineEnd);
  textarea.selectionStart = textarea.selectionEnd = start + (newLine.length - currentLine.length);
  text.value = textarea.value;
  textarea.focus();
};

const toggleHorizontalRule = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const beforeCursor = value.substring(0, start);
  const afterCursor = value.substring(end);

  const horizontalRule = '\n---\n';
  textarea.value = beforeCursor + horizontalRule + afterCursor;
  textarea.selectionStart = textarea.selectionEnd = start + horizontalRule.length;
  text.value = textarea.value;
  textarea.focus();
};

const toggleFootnote = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const mathText = `^[${selectedText}]`;
  textarea.setRangeText(mathText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
  textarea.focus();
}

const toggleHighlight = () => {
  const textarea = document.querySelector('.editor textarea') as HTMLTextAreaElement;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  const mathText = `==${selectedText}==`;
  textarea.setRangeText(mathText, start, end, 'end');
  text.value = textarea.value;
  textarea.setSelectionRange(start + 2, start + 2 + selectedText.length);
  textarea.focus();
}

const handleKeyDown = (event: Event | KeyboardEvent) => {
  if (!(event instanceof KeyboardEvent)) return;
  if (event.ctrlKey && event.key === 'z') {
    event.preventDefault();
    undo();
  }
};

const uploadImage = async () => {
  const localImageRegex = /!\[(.*?)\]\((blob:[^) ]+)(?: \s*=\s*(\d*)?x?(\d*))?(?: \s*:(left|right|center))?\)/g;
  const matches = text.value.matchAll(localImageRegex);
  for (const match of matches) {
    const imageName = match[1];
    const localUrl = match[2];
    const width = match[3];
    const height = match[4];
    const align = match[5];
    const response = await fetch(localUrl);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, imageName);
    await execute({
      params: {
        role: props.album
      },
      data: formData
    }).then((res) => {
      const serverUrl = res.value;
      if (typeof serverUrl === 'string') {
        let replacement = `![${imageName}](${serverUrl}`;
        if (width || height) replacement += ` =${width || ''}x${height || ''}`;
        if (align) replacement += ` :${align}`;
        replacement += ')';
        text.value = text.value.replace(match[0], replacement);
      } else {
        ElNotification({
          title: '上传图片失败',
          type: 'error'
        });
      }
    }).catch(() => {
      ElNotification({
        title: '上传图片失败',
        type: 'error'
      });
    });
  }
};

defineExpose({
  uploadImage,
})

watch(() => text.value, () => {
  saveHistory();
  emit('update:text', text.value);
});

watchEffect(() => {
  text.value = props.text;
});

const maxPreviewHeight = computed(() => {
  const fontSizeValue = parseFloat(props.fontSize) || 16; // 默认字体大小为 16px
  const lineHeightValue = parseFloat(props.lineHeight) || 1.5; // 默认行高为 1.5
  return `${fontSizeValue * lineHeightValue * (props.maxRow - 2)}px`;
});

</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #ebeef5;
  width: 100%;
}

.toolbar .toolbar-section {
  display: flex;
}

.right-aligned {
  margin-left: auto;
}

.toolbar-divider {
  width: 1px;
  background-color: #ebeef5;
  margin: 0 10px;
}

.toolbar-button {
  margin-right: 5px;
  margin-left: 5px;
  width: 30px;
}

.text-editor {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: v-bind('maxPreviewHeight');
}

.editor,
.preview {
  flex: 1;
  border: 1px solid #ebeef5;
}

.editor {
  min-height: 100%;
  overflow-y: auto;
}

.editor ::v-deep(.el-textarea__inner) {
  font-family: 'Fira Code', 'Microsoft YaHei', monospace;
  font-feature-settings: "liga" 0, "calt" 0, "clig" 0;
}

.preview {
  overflow-y: auto;
}

.selected {
  background-color: #d3d3d3;
}

.form-item-input {
  margin-bottom: 10px;
}
</style>